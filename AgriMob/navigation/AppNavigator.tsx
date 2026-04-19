import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import BuyerTabNavigator from "./BuyerTabNavigator";
import FarmerTabNavigator from "./FarmerTabNavigator";

// Placeholder for TransporterTabNavigator — replace with the real import when ready
function TransporterPlaceholder() {
  return (
    <View style={styles.placeholder}>
      <MaterialIcons name="local-shipping" size={64} color="#13ec13" />
      <Text style={styles.title}>Transporter Dashboard</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
    </View>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();

  // user is guaranteed non-null here because App.tsx only renders
  // AppNavigator when isAuthenticated === true
  switch (user?.role) {
    case "BUYER":       return <BuyerTabNavigator />;
    case "FARMER":      return <FarmerTabNavigator />;
    case "TRANSPORTER": return <TransporterPlaceholder />;
    default:            return null; // ADMIN or unknown — handle separately
  }
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f6f8f6", padding: 32 },
  title:       { fontSize: 22, fontWeight: "bold", marginTop: 16, color: "#111827" },
  subtitle:    { marginTop: 8, color: "#6b7280", textAlign: "center" },
});