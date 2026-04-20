// screens/SecurityScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// ─── PIN input ────────────────────────────────────────────────────────────────

const PIN_LENGTH = 6;

const PinDisplay = ({ filled }: { filled: number }) => (
  <View style={styles.pinRow}>
    {Array.from({ length: PIN_LENGTH }).map((_, i) => (
      <View key={i} style={[styles.pinDot, i < filled && styles.pinDotFilled]} />
    ))}
  </View>
);

const Keypad = ({
  onPress,
  onDelete,
}: {
  onPress: (d: string) => void;
  onDelete: () => void;
}) => {
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];
  return (
    <View style={styles.keypad}>
      {keys.map((k, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.keyBtn, k === "" && { opacity: 0 }]}
          onPress={() => (k === "⌫" ? onDelete() : k !== "" && onPress(k))}
          disabled={k === ""}
          activeOpacity={0.7}
        >
          <Text style={k === "⌫" ? styles.keyDelete : styles.keyText}>{k}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ─── section row ─────────────────────────────────────────────────────────────

const SecRow = ({
  icon,
  iconBg,
  label,
  sub,
  right,
  onPress,
  danger,
}: {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  iconBg: string;
  label: string;
  sub?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}) => (
  <TouchableOpacity style={styles.secRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.secIcon, { backgroundColor: iconBg }]}>
      <MaterialIcons name={icon} size={18} color={danger ? "#b91c1c" : "#555"} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={[styles.secLabel, danger && { color: "#b91c1c" }]}>{label}</Text>
      {sub && <Text style={styles.secSub}>{sub}</Text>}
    </View>
    {right ?? <MaterialIcons name="chevron-right" size={20} color="#d1d5db" />}
  </TouchableOpacity>
);

// ─── main screen ─────────────────────────────────────────────────────────────

export default function SecurityScreen() {
  const navigation = useNavigation();
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [pin, setPin] = useState("");
  const [showKeypad, setShowKeypad] = useState(false);

  const handlePinDigit = (d: string) => {
    if (pin.length < PIN_LENGTH) {
      const next = pin + d;
      setPin(next);
      if (next.length === PIN_LENGTH) {
        setTimeout(() => {
          setPin("");
          setShowKeypad(false);
          Alert.alert("PIN Updated", "Your PIN has been set successfully.");
        }, 400);
      }
    }
  };

  const handleDeleteDigit = () => setPin((p) => p.slice(0, -1));

  const confirmDelete = () =>
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone. All your data will be removed.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ]
    );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#1a2e1a" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Security & PIN</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* SECURITY STATUS BANNER */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIconBox}>
            <MaterialIcons name="shield" size={22} color="rgba(255,255,255,0.9)" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Account Secured</Text>
            <Text style={styles.statusSub}>2FA enabled · Last login 2 hours ago</Text>
          </View>
          <View style={styles.safeBadge}>
            <Text style={styles.safeBadgeText}>Safe</Text>
          </View>
        </View>

        {/* AUTHENTICATION */}
        <Text style={styles.sectionHead}>Authentication</Text>
        <View style={styles.card}>
          <SecRow
            icon="lock"
            iconBg="#f0f4ff"
            label="Change Password"
            sub="Last changed 30 days ago"
          />

          <View style={styles.secRow}>
            <View style={[styles.secIcon, { backgroundColor: "#f0faf0" }]}>
              <MaterialIcons name="dialpad" size={18} color="#555" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.secLabel}>PIN Code</Text>
              <PinDisplay filled={pin.length || 3} />
            </View>
            <TouchableOpacity
              style={styles.editPinBtn}
              onPress={() => setShowKeypad(!showKeypad)}
            >
              <Text style={styles.editPinText}>{showKeypad ? "Cancel" : "Change"}</Text>
            </TouchableOpacity>
          </View>

          {showKeypad && (
            <View style={styles.keypadWrap}>
              <Keypad onPress={handlePinDigit} onDelete={handleDeleteDigit} />
            </View>
          )}

          <View style={styles.secRow}>
            <View style={[styles.secIcon, { backgroundColor: "#f0faf0" }]}>
              <MaterialIcons name="fingerprint" size={18} color="#555" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.secLabel}>Biometric Login</Text>
              <Text style={styles.secSub}>Face ID / Fingerprint</Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: "#e5e7eb", true: "#0df20d" }}
              thumbColor="#fff"
              ios_backgroundColor="#e5e7eb"
            />
          </View>

          <View style={[styles.secRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.secIcon, { backgroundColor: "#dbeafe" }]}>
              <MaterialIcons name="smartphone" size={18} color="#555" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.secLabel}>Two-Factor Auth</Text>
              <Text style={styles.secSub}>SMS to +1 (555) ···3456</Text>
            </View>
            <Switch
              value={twoFactor}
              onValueChange={setTwoFactor}
              trackColor={{ false: "#e5e7eb", true: "#0df20d" }}
              thumbColor="#fff"
              ios_backgroundColor="#e5e7eb"
            />
          </View>
        </View>

        {/* SESSIONS */}
        <Text style={styles.sectionHead}>Active Sessions</Text>
        <View style={styles.card}>
          <View style={styles.secRow}>
            <View style={[styles.secIcon, { backgroundColor: "#f0faf0" }]}>
              <MaterialIcons name="smartphone" size={18} color="#047857" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.secLabel}>This Device</Text>
              <Text style={styles.secSub}>iPhone 15 · Active now</Text>
            </View>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Current</Text>
            </View>
          </View>

          <View style={[styles.secRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.secIcon, { backgroundColor: "#f3f4f6" }]}>
              <MaterialIcons name="laptop" size={18} color="#555" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.secLabel}>MacBook Pro</Text>
              <Text style={styles.secSub}>Chrome · 2 days ago</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.revokeText}>Revoke</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DANGER ZONE */}
        <Text style={styles.sectionHead}>Danger Zone</Text>
        <TouchableOpacity style={styles.dangerCard} onPress={confirmDelete} activeOpacity={0.8}>
          <View style={[styles.secIcon, { backgroundColor: "#fee2e2" }]}>
            <MaterialIcons name="delete-forever" size={18} color="#b91c1c" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.secLabel, { color: "#b91c1c" }]}>Delete Account</Text>
            <Text style={styles.secSub}>Permanently remove all your data</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#fca5a5" />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f8f5" },

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
    fontSize: 17,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.3,
  },

  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#047857",
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 16,
    padding: 16,
  },

  statusIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  statusTitle: { fontSize: 14, fontWeight: "800", color: "#fff" },
  statusSub: { fontSize: 12, color: "#a7f3d0", marginTop: 2 },

  safeBadge: {
    backgroundColor: "rgba(13,242,13,0.2)",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  safeBadgeText: { fontSize: 11, fontWeight: "700", color: "#a7f3d0" },

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

  secRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },

  secIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  secLabel: { fontSize: 13, fontWeight: "700", color: "#1a2e1a" },
  secSub: { fontSize: 11, color: "#9ca3af", marginTop: 2 },

  pinRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
  },

  pinDotFilled: { backgroundColor: "#0df20d" },

  editPinBtn: {
    backgroundColor: "#f0faf0",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#c6e8c6",
  },

  editPinText: { fontSize: 12, fontWeight: "700", color: "#047857" },

  keypadWrap: {
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: "#f3f4f6",
    backgroundColor: "#fafff8",
  },

  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },

  keyBtn: {
    width: 64,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    alignItems: "center",
    justifyContent: "center",
  },

  keyText: { fontSize: 20, fontWeight: "700", color: "#1a2e1a" },
  keyDelete: { fontSize: 18, color: "#6b7280" },

  currentBadge: {
    backgroundColor: "#d1fae5",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },

  currentBadgeText: { fontSize: 11, fontWeight: "700", color: "#047857" },

  revokeText: { fontSize: 12, fontWeight: "700", color: "#b91c1c" },

  dangerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#fee2e2",
    padding: 14,
  },
});