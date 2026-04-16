import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ProductStatus = "Active" | "Out of Stock" | "Draft";

interface Product {
  id: string;
  name: string;
  type: string;
  variety: string;
  quantity: string;
  price: string;
  marketPrice: string;
  status: ProductStatus;
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Roma Tomatoes",
    type: "Vegetable",
    variety: "Heirloom Roma",
    quantity: "500 kg",
    price: "$2.20/kg",
    marketPrice: "$2.00",
    status: "Active",
    image: "https://images.unsplash.com/photo-1546470427-1f6c8b6c0c1b",
  },
  {
    id: "2",
    name: "Honey Bantam Corn",
    type: "Grain",
    variety: "Extra Sweet",
    quantity: "1200 units",
    price: "$0.45/unit",
    marketPrice: "$0.50",
    status: "Active",
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
  },
  {
    id: "3",
    name: "California Peppers",
    type: "Vegetable",
    variety: "Bell Pepper",
    quantity: "0 kg",
    price: "$3.50/kg",
    marketPrice: "$3.50",
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1601648764658-cf37e8c8f6b2",
  },
];

export default function ProductManagementScreen() {
  const renderStatus = (status: ProductStatus) => {
    let color = "#999";

    if (status === "Active") color = "green";
    if (status === "Out of Stock") color = "gray";
    if (status === "Draft") color = "orange";

    return (
      <Text style={[styles.status, { color }]}>{status}</Text>
    );
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subText}>
          {item.type} • {item.variety}
        </Text>

        <Text style={styles.meta}>Qty: {item.quantity}</Text>
        <Text style={styles.meta}>
          Price: {item.price} (Market {item.marketPrice})
        </Text>

        {renderStatus(item.status)}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={22} color="#0df20d" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons name="visibility-off" size={22} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Management</Text>

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add-circle" size={20} color="#000" />
          <Text style={styles.addText}>Add Listing</Text>
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {["All", "Active", "Out of Stock", "Drafts"].map((f) => (
            <TouchableOpacity key={f} style={styles.filterBtn}>
              <Text style={styles.filterText}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* LIST */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0df20d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  addText: {
    fontWeight: "700",
    color: "#000",
  },

  filters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  filterBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  subText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  meta: {
    fontSize: 11,
    color: "#444",
  },

  status: {
    marginTop: 6,
    fontWeight: "700",
    fontSize: 12,
  },

  actions: {
    flexDirection: "column",
    gap: 10,
    marginLeft: 10,
  },
});