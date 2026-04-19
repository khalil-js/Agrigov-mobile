import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketStackParamList } from "../../navigation/BuyerTabNavigator";

const formatDZD = (value: number) =>
  "DZD " + new Intl.NumberFormat("fr-DZ").format(value);

const initialCart = [
  {
    id: "1",
    name: "Red Onions (Grade A)",
    price: 450,
    unit: "kg",
    quantity: 500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRX1VdVsHDaRcZkEZac-eIkOIay9Hr7u8lkWzsY1ozNnDYtcp7rbNQNZxpXbB-uGS8e2i9cr_uWRDRKcaCzoLI33uC5U3yphbuc-os3oeDBifcxFo5Hvr6U9UWEdVtPWnJs9N8A1xWYae-kkjE6BJW_byurrq2UBCUkfiWUT0w76i4H41VTf3oH-Upht5iixYDm4-E9aEzZMQcm5FYzdsdnw7plfPfhQBWE2MrqUlx7Q8h5AvXJmwPudFYkphr2ehBtLLotJ2rrUxn",
  },
  {
    id: "2",
    name: "Tomatoes (Roma)",
    price: 8000,
    unit: "crate",
    quantity: 20,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAraINWmh9-C--w-kQq0vqOsAddguYplP1TMvNN8JlrlDBQxotpFOm1LyKgwimlieaxO1k3-Ze5SolQ9YEsztrm3Qwj0u9xk18XPzNP_YLhxFD256vusl9k774_cGPXlMbCLPiB5tLmfN43XlpTemL6whP6hPGz4YZIIbGcemsDw1tBJKgDn1vG5YlruRWf-Fdw-wOt9ZsQKupu46lRkShifuKN_djZCQWoRxw3pSKje1o4DSUXOHtZ28ADllxUONQQjUicn1RcaCCB",
  },
];

export default function CartScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const transport = 45000;
  const levy = subtotal * 0.01;
  const total = subtotal + transport + levy;

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>

        <Text style={styles.price}>
          {formatDZD(item.price)} / {item.unit}
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
          {formatDZD(item.price * item.quantity)}
        </Text>
      </View>

      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.remove}>✕</Text>
      </TouchableOpacity>
    </View>
  );

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
        keyExtractor={(item) => item.id}
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