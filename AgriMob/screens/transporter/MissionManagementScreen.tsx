import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type MissionStatus = "Upcoming" | "In Progress" | "Completed";

interface Mission {
  id: string;
  orderId: string;
  title: string;
  status: MissionStatus;
  payout: string;
  pickup: string;
  dropoff: string;
  cargo: string;
  weight: string;
  eta?: string;
}

const missions: Mission[] = [
  {
    id: "1",
    orderId: "TR-8821",
    title: "Wheat Delivery",
    status: "In Progress",
    payout: "$450.00",
    pickup: "Green Valley Farm",
    dropoff: "Central Mill",
    cargo: "Wheat",
    weight: "5.0 Tons",
    eta: "15 min",
  },
  {
    id: "2",
    orderId: "TR-9045",
    title: "Corn Transport",
    status: "In Progress",
    payout: "$280.00",
    pickup: "Sunny Acres",
    dropoff: "Grain Elevator",
    cargo: "Corn",
    weight: "3.2 Tons",
    eta: "25 min",
  },
  {
    id: "3",
    orderId: "TR-1102",
    title: "Soybeans Delivery",
    status: "Upcoming",
    payout: "$890.00",
    pickup: "Blueberry Ridge",
    dropoff: "Port Warehouse",
    cargo: "Soybeans",
    weight: "12.5 Tons",
  },
];

export default function MissionManagementScreen() {
  const [activeTab, setActiveTab] = useState<MissionStatus | "All">("All");

  const filtered =
    activeTab === "All"
      ? missions
      : missions.filter((m) => m.status === activeTab);

  const getColor = (status: MissionStatus) => {
    if (status === "In Progress") return "#0df20d";
    if (status === "Upcoming") return "#f59e0b";
    return "#6b7280";
  };

  const renderItem = ({ item }: { item: Mission }) => (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>{item.orderId}</Text>
        <Text style={[styles.payout, { color: "#0df20d" }]}>
          {item.payout}
        </Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>

      {/* Route */}
      <View style={styles.route}>
        <Text style={styles.routeText}>📍 {item.pickup}</Text>
        <Text style={styles.routeArrow}>↓</Text>
        <Text style={styles.routeText}>🏁 {item.dropoff}</Text>
      </View>

      {/* Info */}
      <View style={styles.infoRow}>
        <Text style={styles.meta}>Cargo: {item.cargo}</Text>
        <Text style={styles.meta}>Weight: {item.weight}</Text>
        {item.eta && <Text style={styles.meta}>ETA: {item.eta}</Text>}
      </View>

      {/* Status Button */}
      <View style={styles.rowBetween}>
        <View
          style={[
            styles.badge,
            { backgroundColor: getColor(item.status) + "20" },
          ]}
        >
          <Text style={[styles.badgeText, { color: getColor(item.status) }]}>
            {item.status}
          </Text>
        </View>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>
            {item.status === "Upcoming"
              ? "View Details"
              : item.status === "In Progress"
              ? "Continue"
              : "Completed"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mission Management</Text>
        <MaterialIcons name="notifications" size={24} color="#666" />
      </View>

      {/* TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tabs}>
          {["All", "Upcoming", "In Progress", "Completed"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
  },

  tabs: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeTab: {
    backgroundColor: "#0df20d",
    borderColor: "#0df20d",
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },

  activeTabText: {
    color: "#000",
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    marginVertical: 6,
  },

  payout: {
    fontSize: 14,
    fontWeight: "800",
  },

  route: {
    marginVertical: 8,
    paddingLeft: 6,
  },

  routeText: {
    fontSize: 12,
    color: "#444",
  },

  routeArrow: {
    marginVertical: 2,
    color: "#999",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  meta: {
    fontSize: 11,
    color: "#666",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  actionBtn: {
    backgroundColor: "#0df20d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#000",
  },
});