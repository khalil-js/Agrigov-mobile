import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { AuthProvider, useAuth } from "./context/AuthContext";

import AuthNavigator from "./navigation/AuthNavigator";
import AppNavigator from "./navigation/AppNavigator";
import MissionManagementScreen from "./screens/transporter/MissionManagementScreen";

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#13ec13" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MissionManagementScreen />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});