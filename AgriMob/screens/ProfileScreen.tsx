// screens/ProfileScreen.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

interface User {
  name: string;
  role: string;
  totalOrders: number;
  activeDeliveries: number;
}

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />
            <Text style={styles.appName}>AgriConnect</Text>
          </View>

          <TouchableOpacity>
            <MaterialIcons name="settings" size={24} color="#555" />
          </TouchableOpacity>
        </View>

        {/* PROFILE */}
        <View style={styles.profileSection}>
          <Text style={styles.name}>{user?.username || user?.email}</Text>

          <View style={styles.verifiedRow}>
            <MaterialIcons name="verified" size={16} color="#0df20d" />
            <Text style={styles.verifiedText}>{user?.role}</Text>
          </View>

          {/* STATS */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialIcons name="shopping-bag" size={22} color="#0df20d" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>

            <View style={[styles.statCard, styles.activeCard]}>
              <MaterialIcons name="local-shipping" size={22} color="#fff" />
              <Text style={[styles.statNumber, { color: "#fff" }]}>2</Text>
              <Text style={[styles.statLabel, { color: "#fff" }]}>
                Active Deliveries
              </Text>
            </View>
          </View>
        </View>

        {/* SETTINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <SettingItem icon="person" label="Personal Information" />
          <SettingItem icon="receipt-long" label="Order History & Invoices" />
          <SettingItem icon="payments" label="Payment Methods" />
          <SettingItem icon="notifications" label="Notifications" />
          <SettingItem icon="security" label="Security & PIN" />
        </View>

        {/* SUPPORT */}
        <View style={styles.supportCard}>
          <MaterialIcons name="support-agent" size={28} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={styles.supportTitle}>Help & Support</Text>
            <Text style={styles.supportSubtitle}>
              Contact support or browse guides
            </Text>
          </View>

          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Open</Text>
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <MaterialIcons name="logout" size={20} color="#b91c1c" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// ================= COMPONENTS =================

const SettingItem = ({ icon, label }: any) => (
  <TouchableOpacity style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <MaterialIcons name={icon} size={22} color="#555" />
      <Text style={styles.settingText}>{label}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={22} color="#999" />
  </TouchableOpacity>
);

const NavItem = ({ icon, label, active }: any) => (
  <TouchableOpacity style={styles.navItem}>
    <MaterialIcons name={icon} size={24} color={active ? "#0df20d" : "#777"} />
    <Text style={[styles.navLabel, active && { color: "#0df20d" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  appName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  profileSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  verifiedText: {
    fontSize: 12,
    color: "#0df20d",
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  activeCard: {
    backgroundColor: "#0df20d",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
  },

  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
    marginBottom: 10,
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  settingText: {
    fontSize: 14,
  },

  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0df20d",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },

  supportTitle: {
    color: "#000",
    fontWeight: "bold",
  },

  supportSubtitle: {
    color: "#000",
    fontSize: 12,
  },

  supportButton: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  supportButtonText: {
    color: "#0df20d",
    fontWeight: "bold",
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginVertical: 20,
  },

  logoutText: {
    color: "#b91c1c",
    fontWeight: "bold",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  navItem: {
    alignItems: "center",
  },

  navLabel: {
    fontSize: 10,
    color: "#777",
  },
});

/*import { useEffect, useState } from "react";
import axios from "axios";

const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  axios.get("http://YOUR_IP:8000/api/user/profile/")
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
}, []);*/
