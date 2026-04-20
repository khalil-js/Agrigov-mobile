// screens/NotificationsScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// ─── types ────────────────────────────────────────────────────────────────────

interface NotifItem {
  id: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  iconBg: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

interface PrefItem {
  key: string;
  label: string;
  sub: string;
}

// ─── data ─────────────────────────────────────────────────────────────────────

const NOTIFICATIONS: NotifItem[] = [
  {
    id: "1",
    icon: "local-shipping",
    iconBg: "#d1fae5",
    title: "Order Shipped",
    body: "Order #ORD-4022 has been picked up by SwiftHaul and is en route.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    icon: "warning",
    iconBg: "#fff3e0",
    title: "Low Stock Alert",
    body: "Iceberg Lettuce is below 20 units. Consider restocking soon.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    icon: "payments",
    iconBg: "#dbeafe",
    title: "Payment Received",
    body: "$840.00 from FreshMarket Inc. has been deposited to your account.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    icon: "star",
    iconBg: "#f0faf0",
    title: "New Review",
    body: "City Supermarkets gave you 5 stars: Excellent quality produce!",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "5",
    icon: "check-circle",
    iconBg: "#d1fae5",
    title: "Order Delivered",
    body: "Order #ORD-3850 — 8 Tons of Soybeans — was delivered successfully.",
    time: "2 days ago",
    unread: false,
  },
];

const PREFS: PrefItem[] = [
  { key: "orders",    label: "Order Updates",      sub: "Pickup, transit & delivery alerts" },
  { key: "prices",    label: "Price Alerts",        sub: "Market price changes" },
  { key: "stock",     label: "Low Stock Warnings",  sub: "When inventory falls below threshold" },
  { key: "promos",    label: "Promotions",          sub: "Platform offers and news" },
  { key: "sms",       label: "SMS Notifications",   sub: "Critical alerts via text message" },
];

// ─── sub-components ───────────────────────────────────────────────────────────

const NotifCard = ({
  item,
  onDismiss,
}: {
  item: NotifItem;
  onDismiss: (id: string) => void;
}) => (
  <View style={[styles.notifRow, item.unread && styles.notifUnread]}>
    <View style={[styles.notifIcon, { backgroundColor: item.iconBg }]}>
      <MaterialIcons name={item.icon} size={18} color="#555" />
    </View>
    <View style={{ flex: 1 }}>
      <View style={styles.notifHeader}>
        <Text style={styles.notifTitle}>{item.title}</Text>
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>
      <Text style={styles.notifBody}>{item.body}</Text>
    </View>
    {item.unread && <View style={styles.unreadDot} />}
  </View>
);

// ─── main screen ─────────────────────────────────────────────────────────────

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState<NotifItem[]>(NOTIFICATIONS);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    orders: true,
    prices: true,
    stock: true,
    promos: false,
    sms: true,
  });

  const unreadCount = items.filter((i) => i.unread).length;

  const markAllRead = () =>
    setItems((prev) => prev.map((i) => ({ ...i, unread: false })));

  const togglePref = (key: string) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#1a2e1a" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markBtn} onPress={markAllRead}>
            <Text style={styles.markBtnText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* UNREAD COUNT */}
        {unreadCount > 0 && (
          <View style={styles.unreadBanner}>
            <View style={styles.unreadDotLg} />
            <Text style={styles.unreadText}>{unreadCount} unread notification{unreadCount > 1 ? "s" : ""}</Text>
          </View>
        )}

        <Text style={styles.sectionHead}>Recent</Text>
        <View style={styles.card}>
          {items.map((item) => (
            <NotifCard key={item.id} item={item} onDismiss={() => {}} />
          ))}
        </View>

        <Text style={styles.sectionHead}>Preferences</Text>
        <View style={styles.card}>
          {PREFS.map((pref) => (
            <View key={pref.key} style={styles.prefRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.prefLabel}>{pref.label}</Text>
                <Text style={styles.prefSub}>{pref.sub}</Text>
              </View>
              <Switch
                value={prefs[pref.key]}
                onValueChange={() => togglePref(pref.key)}
                trackColor={{ false: "#e5e7eb", true: "#0df20d" }}
                thumbColor="#fff"
                ios_backgroundColor="#e5e7eb"
              />
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    alignItems: "center",
    justifyContent: "center",
  },

  pageTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.3,
  },

  markBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f0faf0",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#c6e8c6",
  },

  markBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#047857",
  },

  unreadBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f0faf0",
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#c6e8c6",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  unreadDotLg: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0df20d",
  },

  unreadText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#047857",
  },

  sectionHead: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    overflow: "hidden",
  },

  notifRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },

  notifUnread: {
    backgroundColor: "#fafff8",
  },

  notifIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  notifHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },

  notifTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a2e1a",
    flex: 1,
  },

  notifTime: {
    fontSize: 10,
    color: "#9ca3af",
    marginLeft: 8,
  },

  notifBody: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 17,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0df20d",
    flexShrink: 0,
    marginTop: 4,
  },

  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },

  prefLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a2e1a",
  },

  prefSub: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
});