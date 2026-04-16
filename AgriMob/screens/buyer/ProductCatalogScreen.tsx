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
import { api } from "../../api/client";

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

  // 🔗 Connect to Django backend
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Static data for testing
      setProducts([
        {
          id: "1",
          name: "Fresh Tomatoes",
          category: "Vegetables",
          description: "Organic red tomatoes from local farms",
          price: 2.5,
          unit: "kg",
          image: "https://via.placeholder.com/200",
          location: "Algiers",
          grade: "A",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Premium Rice",
          category: "Grains",
          description: "High quality rice grains",
          price: 3.0,
          unit: "kg",
          image: "https://via.placeholder.com/200",
          location: "Oran",
          grade: "A",
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
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
              ${item.price} / {item.unit}
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
      {/* 🔍 Search */}
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* 📦 Product List */}
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

[
  {
    id: "1",
    name: "Tomatoes",
    category: "Vegetables",
    description: "Fresh tomatoes",
    price: 24.5,
    unit: "20kg",
    image: "https://...",
    location: "Jijel Farm",
    grade: "A",
    created_at: "2026-04-10",
  },
];
