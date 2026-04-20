// screens/PaymentMethodsScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// ─── types ────────────────────────────────────────────────────────────────────

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  label: string;
  sub: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  label: string;
  date: string;
  amount: string;
  incoming: boolean;
}

// ─── data ─────────────────────────────────────────────────────────────────────

const METHODS: PaymentMethod[] = [
  { id: "1", type: "bank",  label: "AgriBank",    sub: "···7823 · Verified",    isDefault: true },
  { id: "2", type: "card",  label: "Mastercard",  sub: "•••• 8812 · Exp 03/26", isDefault: false },
];

const TRANSACTIONS: Transaction[] = [
  { id: "1", label: "FreshMarket Inc.",    date: "Oct 22, 2024", amount: "+$840",    incoming: true },
  { id: "2", label: "Platform Fee",        date: "Oct 20, 2024", amount: "-$12",     incoming: false },
  { id: "3", label: "Gov Grain Reserve",   date: "Oct 18, 2024", amount: "+$2,375",  incoming: true },
  { id: "4", label: "City Supermarkets",   date: "Oct 15, 2024", amount: "+$1,100",  incoming: true },
  { id: "5", label: "Withdrawal",          date: "Oct 10, 2024", amount: "-$3,000",  incoming: false },
];

// ─── sub-components ───────────────────────────────────────────────────────────

const CreditCard = () => (
  <View style={styles.creditCard}>
    <Text style={styles.cardNetwork}>VISA DEBIT</Text>
    <View style={styles.cardChip} />
    <Text style={styles.cardNumber}>•••• •••• •••• 4291</Text>
    <View style={styles.cardFooter}>
      <View>
        <Text style={styles.cardFieldLabel}>Card Holder</Text>
        <Text style={styles.cardFieldVal}>Elias Thorne</Text>
      </View>
      <View>
        <Text style={styles.cardFieldLabel}>Expires</Text>
        <Text style={styles.cardFieldVal}>08 / 27</Text>
      </View>
      <View>
        <Text style={styles.cardFieldLabel}>CVV</Text>
        <Text style={styles.cardFieldVal}>•••</Text>
      </View>
    </View>
  </View>
);

const MethodRow = ({
  method,
  onSetDefault,
  onRemove,
}: {
  method: PaymentMethod;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
}) => (
  <View style={styles.methodRow}>
    <View style={[styles.methodIcon, { backgroundColor: method.type === "bank" ? "#f0f8ff" : "#fff8f0" }]}>
      <MaterialIcons
        name={method.type === "bank" ? "account-balance" : "credit-card"}
        size={18}
        color="#555"
      />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.methodLabel}>{method.label}</Text>
      <Text style={styles.methodSub}>{method.sub}</Text>
    </View>
    {method.isDefault ? (
      <View style={styles.defaultBadge}>
        <Text style={styles.defaultBadgeText}>Default</Text>
      </View>
    ) : (
      <TouchableOpacity onPress={() => onSetDefault(method.id)}>
        <Text style={styles.setDefaultText}>Set default</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── main screen ─────────────────────────────────────────────────────────────

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();
  const [methods, setMethods] = useState<PaymentMethod[]>(METHODS);

  const setDefault = (id: string) =>
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );

  const confirmRemove = (id: string) =>
    Alert.alert("Remove Method", "Are you sure you want to remove this payment method?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () =>
        setMethods((prev) => prev.filter((m) => m.id !== id))
      },
    ]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#1a2e1a" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Payment Methods</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* CREDIT CARD VISUAL */}
        <Text style={styles.sectionHead}>Default card</Text>
        <CreditCard />

        {/* METHODS */}
        <Text style={styles.sectionHead}>All methods</Text>
        <View style={styles.card}>
          {methods.map((m) => (
            <MethodRow
              key={m.id}
              method={m}
              onSetDefault={setDefault}
              onRemove={confirmRemove}
            />
          ))}
        </View>

        {/* ADD */}
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="add-circle-outline" size={22} color="#0df20d" />
          <Text style={styles.addBtnText}>Add Payment Method</Text>
        </TouchableOpacity>

        {/* TRANSACTIONS */}
        <Text style={styles.sectionHead}>Recent Transactions</Text>
        <View style={styles.card}>
          {TRANSACTIONS.map((tx) => (
            <View key={tx.id} style={styles.txRow}>
              <View style={[styles.txIcon, { backgroundColor: tx.incoming ? "#d1fae5" : "#f3f4f6" }]}>
                <MaterialIcons
                  name={tx.incoming ? "arrow-downward" : "arrow-upward"}
                  size={16}
                  color={tx.incoming ? "#047857" : "#6b7280"}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txLabel}>{tx.label}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.txAmount, { color: tx.incoming ? "#047857" : "#374151" }]}>
                  {tx.amount}
                </Text>
                <Text style={styles.txStatus}>{tx.incoming ? "Received" : "Deducted"}</Text>
              </View>
            </View>
          ))}
        </View>

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

  /* CREDIT CARD */
  creditCard: {
    backgroundColor: "#047857",
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 20,
    marginBottom: 4,
  },

  cardNetwork: {
    fontSize: 10,
    fontWeight: "700",
    color: "#a7f3d0",
    letterSpacing: 0.5,
    marginBottom: 16,
  },

  cardChip: {
    width: 30,
    height: 22,
    borderRadius: 5,
    backgroundColor: "#f0c040",
    marginBottom: 16,
  },

  cardNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 16,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardFieldLabel: {
    fontSize: 9,
    color: "#a7f3d0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },

  cardFieldVal: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },

  /* METHODS */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    overflow: "hidden",
    marginBottom: 4,
  },

  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },

  methodIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  methodLabel: { fontSize: 13, fontWeight: "700", color: "#1a2e1a" },
  methodSub: { fontSize: 11, color: "#9ca3af", marginTop: 2 },

  defaultBadge: {
    backgroundColor: "#d1fae5",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },

  defaultBadgeText: { fontSize: 11, fontWeight: "700", color: "#047857" },
  setDefaultText: { fontSize: 12, fontWeight: "600", color: "#047857" },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 14,
    backgroundColor: "#f9fdf9",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#c6e8c6",
    borderStyle: "dashed",
  },

  addBtnText: { fontSize: 13, fontWeight: "700", color: "#6b7280" },

  /* TRANSACTIONS */
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },

  txIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  txLabel: { fontSize: 13, fontWeight: "700", color: "#1a2e1a" },
  txDate: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: "800" },
  txStatus: { fontSize: 10, color: "#9ca3af", marginTop: 1 },
});