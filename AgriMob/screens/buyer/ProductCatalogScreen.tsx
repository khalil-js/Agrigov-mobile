import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketStackParamList } from "../../navigation/BuyerTabNavigator";
import { productApi } from "../../apis/product.api";

/* 🇩🇿 Algerian currency formatter */
const formatDZD = (value: number) => {
  return value.toFixed(2) + " DZD";
};

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  location: string;
  grade: string;
  created_at: string;
}

const ProductCatalogScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response: any = await productApi.list("");
      const results = response.results ? response.results : response;
      
      const mappedProducts = results.map((item: any) => ({
        id: item.id.toString(),
        name: item.ministry_product?.name || "Unknown Product",
        category: item.category_name || "Uncategorized",
        description: item.description,
        price: parseFloat(item.unit_price) || 0,
        unit: "kg", // Defaults to kg
        image: item.images?.[0]?.image || "https://via.placeholder.com/200",
        location: item.farm?.wilaya || "Unknown Location",
        grade: "A", // Placeholder
        created_at: item.created_at,
      }));
      
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardContent}>
        <Text style={styles.category}>{item.category}</Text>

        <Text style={styles.title}>{item.name}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.locationRow}>
          <Text style={styles.location}>📍 {item.location}</Text>
          <Text style={styles.grade}>{item.grade}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.price}>
              {formatDZD(item.price)} / {item.unit}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("ProductDetails", { productId: item.id })
            }
          >
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductCatalogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 10,
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 160,
  },

  cardContent: {
    padding: 12,
  },

  category: {
    color: "#2db32d",
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },

  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  location: {
    fontSize: 12,
    color: "#444",
  },

  grade: {
    fontSize: 12,
    color: "#0df20d",
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#0df20d",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
});