import React from "react";
import { useAuth } from "../context/AuthContext";
import BuyerTabNavigator from "./BuyerTabNavigator";
import FarmerTabNavigator from "./FarmerTabNavigator";
import RoleSelectionScreen from "../screens/RoleSelectionScreen";

export default function AppNavigator() {
  const { user } = useAuth();

  // Show role selection if not authenticated
  if (!user) {
    return <RoleSelectionScreen />;
  }

  // Render different navigators based on user role
  if (user.role === "BUYER") {
    return <BuyerTabNavigator />;
  } else if (user.role === "FARMER") {
    return <FarmerTabNavigator />;
  }

  // Default to role selection for unknown roles
  return <RoleSelectionScreen />;
}
