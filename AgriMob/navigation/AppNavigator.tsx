import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import BuyerTabNavigator from "./BuyerTabNavigator";
import FarmerTabNavigator from "./FarmerTabNavigator";
import TransporterTabNavigator from "./TransporterTabNavigator";

export default function AppNavigator() {
  const { user, logout } = useAuth();

  // Normalize role to uppercase for safe matching
  const role = user?.role?.toUpperCase?.() ?? "";

  console.log("[NAV] AppNavigator role:", JSON.stringify(user?.role), "→ normalized:", role);

  switch (role) {
    case "BUYER":       return <BuyerTabNavigator />;
    case "FARMER":      return <FarmerTabNavigator />;
    case "TRANSPORTER": return <TransporterTabNavigator />;
    default:
      return (
        <View style={styles.placeholder}>
          <MaterialIcons name="error-outline" size={64} color="#ef4444" />
          <Text style={styles.title}>Unknown Role</Text>
          <Text style={styles.subtitle}>
            Your account role "{user?.role ?? "undefined"}" is not supported in this app.
          </Text>
          <Text style={styles.subtitle}>
            Supported roles: FARMER, BUYER, TRANSPORTER
          </Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f6f8f6", padding: 32 },
  title:       { fontSize: 22, fontWeight: "bold", marginTop: 16, color: "#111827" },
  subtitle:    { marginTop: 8, color: "#6b7280", textAlign: "center" },
  logoutBtn:   { marginTop: 24, backgroundColor: "#ef4444", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  logoutText:  { color: "#fff", fontWeight: "bold", fontSize: 16 },
});