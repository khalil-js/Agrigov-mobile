import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function FarmerDashboard() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* TOP BAR */}
      <View style={styles.header}>
        <MaterialIcons name="menu" size={28} color="#047857" />
        <Text style={styles.title}>Digital Harvest</Text>
        <MaterialIcons name="account-circle" size={32} color="#047857" />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* GREETING */}
        <Text style={styles.greeting}>
          Welcome back,{"\n"}
          <Text style={{ color: "#047857" }}>Elias Thorne</Text>
        </Text>
        <Text style={styles.subText}>
          Everything is growing according to plan today.
        </Text>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Active Listings</Text>
            <Text style={styles.cardValue}>12</Text>
          </View>

          <View style={[styles.card, styles.cardPrimary]}>
            <Text style={styles.cardLabelLight}>Monthly Revenue</Text>
            <Text style={styles.cardValueLight}>$8.4k</Text>
          </View>
        </View>

        {/* PENDING ORDERS */}
        <View style={styles.fullCard}>
          <Text style={styles.cardLabel}>Pending Orders</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.cardValue}>08</Text>
            <MaterialIcons name="local-shipping" size={32} color="#047857" />
          </View>
        </View>

        {/* FIELD STATUS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Field Status</Text>

          <View style={styles.rowBetween}>
            <Text>🌡️ 24°C</Text>
            <Text>💧 68%</Text>
            <Text>🌧️ 15%</Text>
          </View>

          <View style={styles.alertBox}>
            <MaterialIcons name="warning" size={24} color="red" />
            <View>
              <Text style={styles.alertTitle}>Frost Alert</Text>
              <Text style={styles.alertText}>
                Temps dropping tonight in North Field.
              </Text>
            </View>
          </View>
        </View>

        {/* TASKS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Tasks</Text>

          {[
            {
              title: "Update Wheat Inventory",
              sub: "Log data for Section B",
            },
            {
              title: "Check Logistics: Tomato Pickup",
              sub: "Route arrival at 14:00",
            },
            {
              title: "Calibrate Soil Sensors",
              sub: "Completed at 06:30 AM",
              done: true,
            },
          ].map((task, i) => (
            <View key={i} style={styles.task}>
              <View
                style={[
                  styles.checkbox,
                  task.done && styles.checkboxDone,
                ]}
              >
                {task.done && (
                  <MaterialIcons name="check" color="#fff" size={16} />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.done && { textDecorationLine: "line-through" },
                  ]}
                >
                  {task.title}
                </Text>
                <Text style={styles.taskSub}>{task.sub}</Text>
              </View>

              <MaterialIcons name="chevron-right" size={24} />
            </View>
          ))}
        </View>

        {/* PROGRESS */}
        <View style={styles.progressBox}>
          <Text>Harvest Goal Progress</Text>
          <Text style={{ color: "#047857", fontWeight: "bold" }}>72%</Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.smallText}>350 Tons Logged</Text>
            <Text style={styles.smallText}>Goal: 500 Tons</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {[
          { icon: "home", label: "Home", active: true },
          { icon: "grass", label: "Yields" },
          { icon: "local-shipping", label: "Logistics" },
          { icon: "person", label: "Account" },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem}>
            <MaterialIcons
              name={item.icon as any}
              size={24}
              color={item.active ? "#047857" : "#6b7280"}
            />
            <Text
              style={[
                styles.navText,
                item.active && { color: "#047857" },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },

  container: {
    padding: 16,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#065f46",
  },

  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subText: {
    marginTop: 8,
    color: "#6b7280",
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  cardPrimary: {
    backgroundColor: "#047857",
  },

  cardLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "bold",
  },

  cardLabelLight: {
    fontSize: 12,
    color: "#d1fae5",
    fontWeight: "bold",
  },

  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },

  cardValueLight: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  fullCard: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  section: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  alertBox: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fee2e2",
    borderRadius: 10,
  },

  alertTitle: {
    fontWeight: "bold",
    color: "#991b1b",
  },

  alertText: {
    color: "#7f1d1d",
    fontSize: 12,
  },

  task: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#047857",
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxDone: {
    backgroundColor: "#047857",
  },

  taskTitle: {
    fontWeight: "600",
  },

  taskSub: {
    fontSize: 12,
    color: "#6b7280",
  },

  progressBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: {
    width: "72%",
    height: "100%",
    backgroundColor: "#047857",
  },

  smallText: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 6,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
});