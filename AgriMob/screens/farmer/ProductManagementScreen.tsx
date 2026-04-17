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
    name: "Honey Corn",
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
  const getStatusStyle = (status: ProductStatus) => {
    switch (status) {
      case "Active":
        return { backgroundColor: "#0df20d20", color: "#0df20d" };
      case "Out of Stock":
        return { backgroundColor: "#99999920", color: "#777" };
      case "Draft":
        return { backgroundColor: "#ff950020", color: "#ff9500" };
    }
  };

  const renderItem = ({ item }: { item: Product }) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <View style={styles.card}>

        {/* IMAGE */}
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* INFO */}
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>

          <Text style={styles.subText}>
            {item.type} • {item.variety}
          </Text>

          <Text style={styles.meta}>Qty: {item.quantity}</Text>
          <Text style={styles.meta}>
            Price: {item.price} • Market {item.marketPrice}
          </Text>

          {/* STATUS BADGE */}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusStyle.backgroundColor },
            ]}
          >
            <Text style={{ color: statusStyle.color, fontWeight: "700", fontSize: 11 }}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="edit" size={18} color="#0df20d" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="visibility-off" size={18} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Management</Text>

        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add-circle" size={18} color="#000" />
          <Text style={styles.addText}>Add Listing</Text>
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {["All", "Active", "Out of Stock", "Draft"].map((f) => (
            <TouchableOpacity key={f} style={styles.filterChip}>
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

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  headerTitle: {
    fontSize: 20,
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
    borderRadius: 10,
  },

  addText: {
    fontWeight: "700",
    color: "#000",
  },

  /* FILTERS */
  filters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  filterChip: {
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

  /* CARD */
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
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

  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },

  /* ACTIONS */
  actions: {
    justifyContent: "center",
    gap: 10,
    marginLeft: 10,
  },

  iconBtn: {
    padding: 6,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
  },
});