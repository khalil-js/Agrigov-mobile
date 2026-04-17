import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useProducts } from "../../store/productStore";
import SearchBar from "../../components/SearchBar";
import FilterChips from "../../components/FilterChips";
import ProductCard from "../../components/ProductCard";

export default function ProductManagementScreen() {
  const { products, deleteProduct, toggleStatus } = useProducts();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) => (filter === "All" ? true : p.status === filter));
  }, [search, filter, products]);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f5f8f5" }}>

      {/* HEADER */}
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Product Management
      </Text>

      <SearchBar value={search} onChange={setSearch} />

      <FilterChips selected={filter} onSelect={setFilter} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onDelete={() => deleteProduct(item.id)}
            onToggle={() => toggleStatus(item.id)}
          />
        )}
      />
    </View>
  );
}