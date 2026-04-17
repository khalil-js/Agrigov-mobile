import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const filters = ["All", "Active", "Out of Stock", "Draft"];

export default function FilterChips({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (f: string) => void;
}) {
  return (
    <View style={styles.row}>
      {filters.map((f) => (
        <TouchableOpacity
          key={f}
          onPress={() => onSelect(f)}
          style={[
            styles.chip,
            selected === f && { backgroundColor: "#0df20d20" },
          ]}
        >
          <Text>{f}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, marginBottom: 10 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});