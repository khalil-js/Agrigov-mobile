import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";

import MissionManagementScreen from "../screens/transporter/MissionManagementScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

export type TransporterTabParamList = {
  Missions: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TransporterTabParamList>();

export default function TransporterTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<
          TransporterTabParamList,
          keyof TransporterTabParamList
        >;
      }) => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Missions") {
            iconName = focused ? "map" : "map-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Missions" component={MissionManagementScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
