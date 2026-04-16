import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InventoryStackParamList } from "../../navigation/FarmerTabNavigator";

const products = [
  {
    id: "1",
    name: "Russet Potatoes",
    quantity: "1200 kg",
    price: "$0.85/kg",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1582515073490-dc2c7b1b7c4d",
  },
  {
    id: "2",
    name: "Iceberg Lettuce",
    quantity: "150 heads",
    price: "$1.20/unit",
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    id: "3",
    name: "Sweet Corn",
    quantity: "5.5 Tons",
    price: "$190/ton",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
  },
];

export default function InventoryScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<InventoryStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Inventory Management</Text>
        <Text style={styles.subtitle}>
          Track your stock and manage harvests
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue</Text>
          <Text style={styles.cardValue}>$12,450</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stock</Text>
          <Text style={styles.cardValue}>45.2 Tons</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Orders</Text>
          <Text style={styles.cardValue}>3 Pending</Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search products..."
          style={styles.searchInput}
        />
      </View>

      {/* PRODUCTS */}
      <View style={styles.grid}>
        {products.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productText}>{item.quantity}</Text>
              <Text style={styles.productText}>{item.price}</Text>

              <Text
                style={[
                  styles.status,
                  item.status === "Low Stock"
                    ? styles.lowStock
                    : styles.inStock,
                ]}
              >
                {item.status}
              </Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 4,
  },

  cardTitle: {
    fontSize: 12,
    color: "#777",
  },

  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 120,
  },

  productInfo: {
    padding: 10,
  },

  productName: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  productText: {
    fontSize: 12,
    color: "#666",
  },

  status: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },

  inStock: {
    color: "green",
  },

  lowStock: {
    color: "orange",
  },

  button: {
    marginTop: 10,
    backgroundColor: "#0df20d",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
