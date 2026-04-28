import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
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
};

export type BuyerTabParamList = {
  Market: undefined;
  Cart: undefined;
  Checkout: undefined;
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
    </MarketStack.Navigator>
  );
}

// ── Tab icon config ────────────────────────────────────────────────────────────

type TabConfig = {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconFocused: keyof typeof MaterialIcons.glyphMap;
  label: string;
};

const TAB_CONFIG: Partial<Record<keyof BuyerTabParamList, TabConfig>> = {
  Market: {
    icon: "storefront",
    iconFocused: "storefront",
    label: "Market",
  },
  Cart: {
    icon: "shopping-basket",
    iconFocused: "shopping-basket",
    label: "Cart",
  },
  Orders: {
    icon: "receipt-long",
    iconFocused: "receipt-long",
    label: "Orders",
  },
  Profile: {
    icon: "person-outline",
    iconFocused: "person",
    label: "Profile",
  },
};

// ── Custom Tab Bar ─────────────────────────────────────────────────────────────

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={tabStyles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name as keyof BuyerTabParamList];

        if (!config) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={tabStyles.tabItem}
            activeOpacity={0.7}
          >
            <View
              style={[
                tabStyles.iconWrap,
                isFocused && tabStyles.iconWrapActive,
              ]}
            >
              <MaterialIcons
                name={isFocused ? config.iconFocused : config.icon}
                size={20}
                color={isFocused ? "#047857" : "#9ca3af"}
              />
            </View>
            <Text style={[tabStyles.label, isFocused && tabStyles.labelActive]}>
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
    paddingBottom: 24, // safe area offset for home bar
    paddingHorizontal: 8,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },

  iconWrap: {
    width: 40,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapActive: {
    backgroundColor: "#d1fae5",
  },

  label: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 0.1,
  },

  labelActive: {
    color: "#047857",
  },
});

// ── Navigator ─────────────────────────────────────────────────────────────────

export default function BuyerTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Market" component={MarketStackNavigator} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Checkout" component={CheckoutScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
