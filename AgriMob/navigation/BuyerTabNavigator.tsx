import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import type {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import type { RouteProp } from "@react-navigation/native";

// Import screens
import ProductCatalogScreen from "../screens/buyer/ProductCatalogScreen";
import ProductDetailsScreen from "../screens/buyer/ProductDetailsScreen";
import CartScreen from "../screens/buyer/CartScreen";
import CheckoutScreen from "../screens/buyer/CheckoutScreen";
import OrdersScreen from "../screens/buyer/OrdersScreen";
import ProfileStack from "./ProfileStack";

export type MarketStackParamList = {
  ProductCatalog: undefined;
  ProductDetails: { productId: string };
  Checkout: undefined;
};

export type BuyerTabParamList = {
  Market: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BuyerTabParamList>();
const MarketStack = createNativeStackNavigator<MarketStackParamList>();

function MarketStackNavigator() {
  return (
    <MarketStack.Navigator screenOptions={{ headerShown: false }}>
      <MarketStack.Screen
        name="ProductCatalog"
        component={ProductCatalogScreen}
      />
      <MarketStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
      <MarketStack.Screen name="Checkout" component={CheckoutScreen} />
    </MarketStack.Navigator>
  );
}

type TabIconProps = {
  route: RouteProp<BuyerTabParamList, keyof BuyerTabParamList>;
  focused: boolean;
  color: string;
  size: number;
};

export default function BuyerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<BuyerTabParamList, keyof BuyerTabParamList>;
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

          if (route.name === "Market") {
            iconName = focused ? "storefront" : "storefront-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "basket" : "basket-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "list" : "list-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Market" component={MarketStackNavigator} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
