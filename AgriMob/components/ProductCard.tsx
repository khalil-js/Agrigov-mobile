import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Product } from "../types/Product";

export default function ProductCard({
  product,
  onDelete,
  onToggle,
}: {
  product: Product;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.img} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.sub}>{product.type} • {product.variety}</Text>
        <Text style={styles.meta}>{product.quantity}</Text>

        <Text style={styles.status}>{product.status}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onToggle}>
          <MaterialIcons name="sync" size={20} color="#0df20d" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <MaterialIcons name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  img: { width: 55, height: 55, borderRadius: 10, marginRight: 10 },
  title: { fontWeight: "bold" },
  sub: { fontSize: 12, color: "#666" },
  meta: { fontSize: 11 },
  status: { marginTop: 5, fontWeight: "bold", color: "#0df20d" },
  actions: { justifyContent: "center", gap: 10 },
});