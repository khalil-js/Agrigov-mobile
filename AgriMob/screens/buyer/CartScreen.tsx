import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketStackParamList } from "../../navigation/BuyerTabNavigator";
import { cartApi } from "../../apis/cart.api";
import { ActivityIndicator } from "react-native";

const formatDZD = (value: number) =>
  "DZD " + new Intl.NumberFormat("fr-DZ").format(value);

export default function CartScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res: any = await cartApi.get();
      setCart(res.items || []);
    } catch (err: any) {
      console.error(err);
      if (err.message) {
        Alert.alert("Cart Error", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id: number, delta: number) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    const newQuantity = Math.max(1, item.quantity + delta);
    
    // Optimistic UI update
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: newQuantity, total_price: i.price * newQuantity } : i
      )
    );

    try {
      await cartApi.update(id, newQuantity);
    } catch (error) {
      console.error(error);
      fetchCart(); // Revert on failure
    }
  };

  const removeItem = async (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    try {
      await cartApi.remove(id);
    } catch (error) {
      console.error(error);
      fetchCart();
    }
  };

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0),
    [cart]
  );

  const transport = 45000;
  const levy = subtotal * 0.01;
  const total = subtotal + transport + levy;

  const renderItem = ({ item }: any) => {
    const product = item.product || {};
    const title = product.ministry_product?.name || "Unknown Product";
    const imageUri = product.images?.[0]?.image || "https://via.placeholder.com/80";

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.price}>
            {formatDZD(parseFloat(item.price))} / kg
          </Text>

          {/* Quantity Stepper */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, -1)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qty}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => updateQuantity(item.id, 1)}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtotal}>
            {formatDZD(parseFloat(item.total_price))}
          </Text>
        </View>

        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Text style={styles.remove}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Subtotal: {formatDZD(subtotal)}
        </Text>

        <Text style={styles.summaryText}>
          Transport: {formatDZD(transport)}
        </Text>

        <Text style={styles.summaryText}>
          Levy (1%): {formatDZD(levy)}
        </Text>

        <Text style={styles.total}>
          Total: {formatDZD(total)}
        </Text>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
  },

  price: {
    color: "#555",
    marginVertical: 4,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    backgroundColor: "#eee",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  qty: {
    marginHorizontal: 10,
    fontWeight: "bold",
  },

  subtotal: {
    fontWeight: "bold",
    marginTop: 6,
  },

  remove: {
    fontSize: 18,
    color: "red",
  },

  summary: {
    padding: 18,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fafafa",
  },

  summaryText: {
    marginBottom: 4,
    color: "#555",
  },

  total: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },

  checkoutBtn: {
    backgroundColor: "#0df20d",
    padding: 14,
    alignItems: "center",
    borderRadius: 10,
  },

  checkoutText: {
    fontWeight: "bold",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});