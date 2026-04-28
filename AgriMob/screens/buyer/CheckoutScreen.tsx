import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { cartApi } from "../../apis/cart.api";
import { orderApi } from "../../apis/order.api";
import { transporterApi, ApiVehicle } from "../../apis/transporter.api";
import { useAuth } from "../../context/AuthContext";

const formatDZD = (value: number) =>
  new Intl.NumberFormat("fr-DZ").format(Math.round(value)) + " DZD";

interface Transporter {
  id: number;
  name: string;
  rating: number;
  price: number;
  delivery_time: string;
  badge?: string;
}

interface TransporterWithMission extends ApiVehicle {
  price_per_km: number;
  rating: number;
  completed_missions: number;
  wilaya?: string;
}

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [transporterLoading, setTransporterLoading] = useState(true);
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Fetch cart items
  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        try {
          const res: any = await cartApi.get();
          setProducts(res.items || []);
          setSubtotal(parseFloat(res.total_price || 0));
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }, []),
  );

  // Fetch available transporters
  useFocusEffect(
    useCallback(() => {
      const fetchTransporters = async () => {
        try {
          setTransporterLoading(true);
          // Fetch available transporters from backend
          // TODO: Replace with actual API endpoint when backend supports it
          // const transportersData = await transporterApi.availableTransporters(userProfile?.wilaya);

          // For now, use mock transporters until backend endpoint is available
          const mockTransporters: Transporter[] = [
            {
              id: 1,
              name: "Agro Logistics",
              rating: 4.8,
              price: 120,
              delivery_time: "2-3 Days",
              badge: "Fastest",
            },
            {
              id: 2,
              name: "Farm Express",
              rating: 4.5,
              price: 90,
              delivery_time: "3-4 Days",
            },
            {
              id: 3,
              name: "Djaz Transport",
              rating: 4.7,
              price: 100,
              delivery_time: "2-4 Days",
            },
          ];

          setTransporters(mockTransporters);
          if (mockTransporters.length > 0) {
            setSelectedTransporter(mockTransporters[0]);
          }
        } catch (err) {
          console.error("Failed to fetch transporters:", err);
        } finally {
          setTransporterLoading(false);
        }
      };
      fetchTransporters();
    }, [userProfile?.wilaya]),
  );

  // Fetch user profile for delivery address
  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const { profileApi } = await import("../../apis/profile.api");
          const profile = await profileApi.me();
          setUserProfile(profile);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
        }
      };
      fetchProfile();
    }, []),
  );

  const levy = subtotal * 0.01;
  const total = selectedTransporter ? subtotal + selectedTransporter.price + levy : subtotal + levy;

  const handleCheckout = async () => {
    // Validate payment info
    if (!card.number || !card.expiry || !card.cvc || !card.name) {
      Alert.alert("Missing Payment Info", "Please fill in all card details");
      return;
    }

    if (!selectedTransporter) {
      Alert.alert("No Transporter", "Please select a transporter");
      return;
    }

    setCheckoutLoading(true);
    try {
      // Build checkout payload
      const payload = {
        transporter_id: selectedTransporter.id,
        delivery_address: userProfile?.delivery_address || "Jijel, Algeria",
        wilaya: userProfile?.wilaya || "Jijel",
        baladiya: userProfile?.baladiya || "Jijel",
        phone: userProfile?.phone || "+213 XXX XXX",
        payment_method: "card",
        card_number: card.number,
        card_expiry: card.expiry,
        card_cvc: card.cvc,
        card_name: card.name,
        notes: "",
      };

      const result = await orderApi.checkout(payload);

      // Clear cart after successful order
      await cartApi.clear().catch(() => {});

      Alert.alert(
        "Order Placed!",
        `Your order ${result.order_number} has been placed successfully.`,
        [
          {
            text: "View Orders",
            onPress: () => navigation.navigate("Orders"),
          },
        ],
      );
    } catch (err: any) {
      console.error("Checkout error:", err);
      Alert.alert(
        "Checkout Failed",
        err.response?.data?.detail || err.message || "An error occurred",
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <ActivityIndicator size="large" color="#0df20d" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#1a2e1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step indicator */}
        <View style={styles.stepRow}>
          {["Address", "Transport", "Payment", "Confirm"].map((step, i) => (
            <React.Fragment key={step}>
              <View style={styles.stepItem}>
                <View style={[styles.stepDot, i <= 2 && styles.stepDotActive]}>
                  {i < 2 ? (
                    <MaterialIcons name="check" size={10} color="#065f46" />
                  ) : (
                    <Text style={styles.stepDotNum}>{i + 1}</Text>
                  )}
                </View>
                <Text
                  style={[styles.stepLabel, i <= 2 && styles.stepLabelActive]}
                >
                  {step}
                </Text>
              </View>
              {i < 3 && (
                <View style={[styles.stepLine, i < 2 && styles.stepLineDone]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Delivery Address */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <MaterialIcons name="place" size={16} color="#047857" />
            </View>
            <Text style={styles.cardTitle}>Delivery Address</Text>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressBody}>
            <Text style={styles.addressName}>
              {userProfile?.full_name || userProfile?.username || "Delivery Address"}
            </Text>
            <Text style={styles.addressSub}>
              {userProfile?.wilaya && userProfile?.baladiya
                ? `${userProfile.wilaya}, ${userProfile.baladiya}`
                : "Jijel, Algeria"}
            </Text>
            <Text style={styles.addressSub}>
              {userProfile?.phone || "+213 XXX XXX"}
            </Text>
          </View>
        </View>

        {/* Select Transporter */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <MaterialIcons name="local-shipping" size={16} color="#047857" />
            </View>
            <Text style={styles.cardTitle}>Select Transporter</Text>
          </View>

          {transporterLoading ? (
            <View style={styles.transporterLoading}>
              <ActivityIndicator size="small" color="#047857" />
              <Text style={styles.transporterLoadingText}>Finding transporters...</Text>
            </View>
          ) : transporters.length === 0 ? (
            <View style={styles.emptyTransporters}>
              <MaterialIcons name="local-shipping" size={32} color="#d1d5db" />
              <Text style={styles.emptyTransportersText}>No transporters available</Text>
            </View>
          ) : (
            transporters.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.transporterOpt,
                  selectedTransporter?.id === t.id && styles.transporterOptActive,
                ]}
                onPress={() => setSelectedTransporter(t)}
              >
                <View style={styles.transporterLeft}>
                  <View style={styles.transporterAvatar}>
                    <MaterialIcons
                      name="directions-car"
                      size={16}
                      color="#047857"
                    />
                  </View>
                  <View>
                    <View style={styles.transporterNameRow}>
                      <Text style={styles.transporterName}>{t.name}</Text>
                      {t.badge && (
                        <View style={styles.transporterBadge}>
                          <Text style={styles.transporterBadgeText}>
                            {t.badge}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.transporterMeta}>
                      <MaterialIcons name="star" size={11} color="#f59e0b" />
                      <Text style={styles.transporterMetaText}>{t.rating}</Text>
                      <Text style={styles.metaDot}>·</Text>
                      <MaterialIcons name="schedule" size={11} color="#9ca3af" />
                      <Text style={styles.transporterMetaText}>
                        {t.delivery_time}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.transporterPriceCol}>
                  <Text style={styles.transporterPrice}>
                    {formatDZD(t.price)}
                  </Text>
                  {selectedTransporter?.id === t.id && (
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#0df20d"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <MaterialIcons name="credit-card" size={16} color="#047857" />
            </View>
            <Text style={styles.cardTitle}>Payment Method</Text>
          </View>

          <TextInput
            placeholder="Card number"
            placeholderTextColor="#c0cfc0"
            style={styles.input}
            value={card.number}
            onChangeText={(v) => setCard({ ...card, number: v })}
            keyboardType="number-pad"
          />

          <View style={styles.inputRow}>
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor="#c0cfc0"
              style={[styles.input, styles.inputHalf]}
              value={card.expiry}
              onChangeText={(v) => setCard({ ...card, expiry: v })}
            />
            <TextInput
              placeholder="CVC"
              placeholderTextColor="#c0cfc0"
              style={[styles.input, styles.inputHalf]}
              value={card.cvc}
              onChangeText={(v) => setCard({ ...card, cvc: v })}
              keyboardType="number-pad"
            />
          </View>

          <TextInput
            placeholder="Name on card"
            placeholderTextColor="#c0cfc0"
            style={styles.input}
            value={card.name}
            onChangeText={(v) => setCard({ ...card, name: v })}
          />
        </View>

        {/* Order Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <MaterialIcons name="receipt-long" size={16} color="#047857" />
            </View>
            <Text style={styles.cardTitle}>Order Summary</Text>
          </View>

          {products.map((p) => {
            const prod = p.product || {};
            return (
              <View key={p.id} style={styles.orderItem}>
                <Image
                  source={{
                    uri:
                      prod.images?.[0]?.image ||
                      "https://via.placeholder.com/100",
                  }}
                  style={styles.orderItemImage}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderItemName} numberOfLines={1}>
                    {prod.ministry_product?.name || "Unknown Product"}
                  </Text>
                  <Text style={styles.orderItemQty}>{p.quantity} kg</Text>
                </View>
                <Text style={styles.orderItemPrice}>
                  {formatDZD(parseFloat(p.total_price))}
                </Text>
              </View>
            );
          })}

          <View style={styles.divider} />

          <Row label="Subtotal" value={formatDZD(subtotal)} />
          <Row
            label={`Transport (${selectedTransporter?.name || "N/A"})`}
            value={formatDZD(selectedTransporter?.price || 0)}
          />
          <Row label="Platform levy (1%)" value={formatDZD(levy)} />

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>{formatDZD(total)}</Text>
          </View>

          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? (
              <ActivityIndicator color="#065f46" />
            ) : (
              <>
                <MaterialIcons name="lock" size={16} color="#065f46" />
                <Text style={styles.confirmBtnText}>Confirm Payment</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryVal}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f8f5",
  },

  scrollContent: {
    padding: 14,
  },

  // ── HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f8faf8",
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.2,
  },

  // ── STEP INDICATOR
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
  },

  stepItem: {
    alignItems: "center",
    gap: 4,
  },

  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },

  stepDotActive: {
    backgroundColor: "#d1fae5",
  },

  stepDotNum: {
    fontSize: 10,
    fontWeight: "800",
    color: "#9ca3af",
  },

  stepLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#c4c4c4",
    letterSpacing: 0.2,
  },

  stepLabelActive: {
    color: "#047857",
  },

  stepLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 4,
    marginBottom: 14,
  },

  stepLineDone: {
    backgroundColor: "#0df20d",
  },

  // ── CARDS
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },

  cardIconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1a2e1a",
    flex: 1,
    letterSpacing: -0.2,
  },

  editBtn: {
    backgroundColor: "#f8faf8",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
  },

  editBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#047857",
  },

  // ── ADDRESS
  addressBody: {
    backgroundColor: "#f8faf8",
    borderRadius: 12,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
  },

  addressName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1a2e1a",
    marginBottom: 3,
  },

  addressSub: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 1,
  },

  // ── TRANSPORTER
  transporterOpt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    borderRadius: 12,
    marginBottom: 8,
  },

  transporterOptActive: {
    borderWidth: 1.5,
    borderColor: "#0df20d",
    backgroundColor: "#f0fdf4",
  },

  transporterLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  transporterAvatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
  },

  transporterNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 3,
  },

  transporterName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1a2e1a",
  },

  transporterBadge: {
    backgroundColor: "#fef3c7",
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },

  transporterBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#92400e",
  },

  transporterMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  transporterMetaText: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
  },

  metaDot: {
    color: "#d1d5db",
    marginHorizontal: 2,
  },

  transporterPriceCol: {
    alignItems: "flex-end",
    gap: 4,
  },

  transporterPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#047857",
  },

  transporterLoading: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 8,
  },

  transporterLoadingText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
  },

  emptyTransporters: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 8,
  },

  emptyTransportersText: {
    fontSize: 13,
    color: "#9ca3af",
  },

  // ── PAYMENT INPUTS
  input: {
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: "#1a2e1a",
    backgroundColor: "#f8faf8",
    marginBottom: 8,
  },

  inputRow: {
    flexDirection: "row",
    gap: 8,
  },

  inputHalf: {
    flex: 1,
  },

  // ── ORDER ITEMS
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  orderItemImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },

  orderItemName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a2e1a",
    marginBottom: 2,
  },

  orderItemQty: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
  },

  orderItemPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: "#374151",
  },

  divider: {
    height: 0.5,
    backgroundColor: "#e4efe4",
    marginVertical: 10,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
  },

  summaryVal: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1a2e1a",
  },

  totalVal: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.4,
  },

  confirmBtn: {
    backgroundColor: "#0df20d",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  confirmBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#065f46",
  },
});
