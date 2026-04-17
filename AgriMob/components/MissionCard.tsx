import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Mission = {
  id: string;
  title: string;
  type: string;
  price: number;
  weight: number;
  distance: number;
  from: string;
  to: string;
};

export default function MissionCard({ mission }: { mission: Mission }) {
  return (
    <View style={styles.card}>

      <View style={styles.topRow}>
        <Text style={styles.title}>{mission.title}</Text>
        <Text style={styles.price}>${mission.price}</Text>
      </View>

      <Text style={styles.type}>{mission.type}</Text>

      <Text style={styles.route}>
        {mission.from} → {mission.to}
      </Text>

      <View style={styles.metaRow}>
        <Text>⚖ {mission.weight} kg</Text>
        <Text>📍 {mission.distance} km</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Mission</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: { fontSize: 16, fontWeight: "bold" },
  price: { color: "green", fontWeight: "bold" },

  type: {
    marginTop: 4,
    color: "#888",
  },

  route: {
    marginTop: 6,
    fontSize: 13,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  button: {
    marginTop: 12,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});