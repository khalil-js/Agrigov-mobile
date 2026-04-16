import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import BuyerTabNavigator from "./BuyerTabNavigator";

// Placeholder screens - replace with actual screens later
function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email}</Text>
      <Text style={styles.role}>Role: {user?.role}</Text>
      <Text style={styles.status}>
        Status: {user?.is_verified ? "Verified" : "Pending Verification"}
      </Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export type AppStackParamList = {
  Home: undefined;
  // Add more authenticated screens here
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  const { user } = useAuth();

  // Render different navigators based on user role
  if (user?.role === "BUYER") {
    return <BuyerTabNavigator />;
  }

  // Default to Home screen for other roles or no role
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f8f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  role: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#0df20d",
    marginBottom: 30,
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
