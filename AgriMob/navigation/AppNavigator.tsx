import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import BuyerTabNavigator from "./BuyerTabNavigator";
import FarmerTabNavigator from "./FarmerTabNavigator";
import TransporterTabNavigator from "./TransporterTabNavigator";

export default function AppNavigator() {
  const { user } = useAuth();

  switch (user?.role) {
    case "BUYER":       return <BuyerTabNavigator />;
    case "FARMER":      return <FarmerTabNavigator />;
    case "TRANSPORTER": return <TransporterTabNavigator />;
    default:            return null;
  }
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f6f8f6", padding: 32 },
  title:       { fontSize: 22, fontWeight: "bold", marginTop: 16, color: "#111827" },
  subtitle:    { marginTop: 8, color: "#6b7280", textAlign: "center" },
});