import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const StatCard = ({ title, value, icon }: any) => (
  <View style={styles.statCard}>
    <MaterialIcons name={icon} size={20} color="#0df20d" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const StatusBadge = ({ status }: any) => {
  let color = "#999";

  if (status === "Pending") color = "orange";
  if (status === "Loaded") color = "blue";
  if (status === "Transit") color = "purple";
  if (status === "Delivered") color = "green";

  return (
    <Text style={[styles.status, { color }]}>{status}</Text>
  );
};

const PickupItem = ({ date, title, desc }: any) => (
  <View style={styles.pickup}>
    <View style={styles.dateBox}>
      <Text style={styles.dateText}>{date}</Text>
    </View>

    <View>
      <Text style={styles.buyer}>{title}</Text>
      <Text style={styles.subText}>{desc}</Text>
    </View>
  </View>
);

const orders = [
  {
    id: "#ORD-4022",
    buyer: "FreshMarket Inc.",
    product: "Corn • 5 Tons",
    transporter: "SwiftHaul",
    status: "Pending",
  },
  {
    id: "#ORD-4019",
    buyer: "Gov Grain Reserve",
    product: "Wheat • 12.5 Tons",
    transporter: "AgriTrans",
    status: "Loaded",
  },
  {
    id: "#ORD-3988",
    buyer: "City Supermarkets",
    product: "Tomatoes • 2 Tons",
    transporter: "FastFresh",
    status: "Transit",
  },
  {
    id: "#ORD-3850",
    buyer: "Organic Wholesalers",
    product: "Soybeans • 8 Tons",
    transporter: "GreenRoute",
    status: "Delivered",
  },
];

export default function LogisticsScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Logistics Overview</Text>
        <Text style={styles.subtitle}>
          Manage shipments and deliveries
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <StatCard title="Ready" value="12" icon="inventory" />
        <StatCard title="Transit" value="8" icon="local-shipping" />
        <StatCard title="Delivered" value="24" icon="check-circle" />
        <StatCard title="On-Time" value="98%" icon="trending-up" />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={20} color="#888" />
        <TextInput placeholder="Search orders..." style={styles.input} />
      </View>

      {/* ORDERS LIST */}
      <View>
        {orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.orderId}>{order.id}</Text>
              <StatusBadge status={order.status} />
            </View>

            <Text style={styles.buyer}>{order.buyer}</Text>
            <Text style={styles.subText}>{order.product}</Text>

            <View style={styles.row}>
              <Text style={styles.subText}>
                🚚 {order.transporter}
              </Text>

              <TouchableOpacity>
                <MaterialIcons name="more-vert" size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* UPCOMING PICKUPS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Pickups</Text>

        <PickupItem
          date="Oct 24"
          title="SwiftHaul Logistics"
          desc="Order #4022 • Corn"
        />

        <PickupItem
          date="Oct 25"
          title="AgriTrans Co."
          desc="Order #4025 • Rice"
        />
      </View>

      {/* TRACKING */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Tracking</Text>

        <View style={styles.trackingCard}>
          <Text style={styles.buyer}>Truck TRK-8921</Text>
          <Text style={styles.subText}>
            20km away • Arrival 45 min
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 16,
  },

  header: { marginBottom: 20 },

  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#666" },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },

  statTitle: {
    fontSize: 12,
    color: "#777",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderId: {
    fontWeight: "bold",
  },

  buyer: {
    fontWeight: "bold",
    marginTop: 5,
  },

  subText: {
    fontSize: 12,
    color: "#666",
  },

  status: {
    fontSize: 12,
    fontWeight: "bold",
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  pickup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  dateBox: {
    backgroundColor: "#0df20d",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },

  dateText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  trackingCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
});