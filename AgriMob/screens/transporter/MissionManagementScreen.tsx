// screens/MissionManagementScreen.tsx

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path, Circle } from "react-native-svg";

// ─── types ────────────────────────────────────────────────────────────────────

type MissionStatus = "In Progress" | "Upcoming" | "Completed";
type TabKey = "missions" | "available" | "history";
type CargoType = "Perishable" | "Fragile" | "Dry Goods" | "Bulk";

interface Mission {
  id: string;
  orderId: string;
  title: string;
  status: MissionStatus;
  payout: number;
  pickup: string;
  dropoff: string;
  cargo: string;
  cargoType: CargoType;
  weight: string;
  distance: string;
  eta?: string;
  routeProgress?: number; // 0-1
}

interface AvailableMission {
  id: string;
  title: string;
  cargoType: CargoType;
  cargo: string;
  payout: number;
  weight: string;
  distance: string;
  eta: string;
  pickup: string;
  dropoff: string;
}

interface HistoryItem {
  id: string;
  orderId: string;
  date: string;
  title: string;
  buyer: string;
  weight: string;
  payout: number;
}

// ─── data ─────────────────────────────────────────────────────────────────────

const MY_MISSIONS: Mission[] = [
  {
    id: "1",
    orderId: "TR-8821",
    title: "Wheat Sack Delivery",
    status: "In Progress",
    payout: 450,
    pickup: "Green Valley Farm",
    dropoff: "Central Mill",
    cargo: "Wheat",
    cargoType: "Bulk",
    weight: "5.0 Tons",
    distance: "32 km",
    eta: "15 min",
    routeProgress: 0.6,
  },
  {
    id: "2",
    orderId: "TR-9045",
    title: "Corn Transport",
    status: "In Progress",
    payout: 280,
    pickup: "Sunny Acres",
    dropoff: "Grain Elevator",
    cargo: "Corn",
    cargoType: "Bulk",
    weight: "3.2 Tons",
    distance: "22 km",
    eta: "25 min",
    routeProgress: 0.35,
  },
  {
    id: "3",
    orderId: "TR-1102",
    title: "Soybeans Delivery",
    status: "Upcoming",
    payout: 890,
    pickup: "Blueberry Ridge Farm",
    dropoff: "Port Warehouse · Bay 3",
    cargo: "Soybeans",
    cargoType: "Dry Goods",
    weight: "12.5 Tons",
    distance: "48 km",
    routeProgress: 0,
  },
];

const AVAILABLE_MISSIONS: AvailableMission[] = [
  {
    id: "a1",
    title: "Fresh Tomatoes",
    cargoType: "Perishable",
    cargo: "Tomatoes",
    payout: 240,
    weight: "450 kg",
    distance: "32 km",
    eta: "~45 min",
    pickup: "Green Valley Farm, Sector 4",
    dropoff: "Central Wholesale Market",
  },
  {
    id: "a2",
    title: "Egg Crates (×50)",
    cargoType: "Fragile",
    cargo: "Eggs",
    payout: 185,
    weight: "200 kg",
    distance: "18 km",
    eta: "~30 min",
    pickup: "Sunny Side Poultry Farm",
    dropoff: "Metro Supermarket Depot",
  },
  {
    id: "a3",
    title: "Rice Sacks Bulk",
    cargoType: "Dry Goods",
    cargo: "Rice",
    payout: 520,
    weight: "8 Tons",
    distance: "61 km",
    eta: "~1h 30m",
    pickup: "Delta Grain Cooperative",
    dropoff: "North Port Storage",
  },
];

const HISTORY_ITEMS: HistoryItem[] = [
  { id: "h1", orderId: "TR-3850", date: "Oct 22", title: "Soybean Run",    buyer: "Organic Wholesalers", weight: "8 Tons",    payout: 890 },
  { id: "h2", orderId: "TR-3791", date: "Oct 21", title: "Tomato Haul",    buyer: "City Supermarkets",   weight: "2 Tons",    payout: 310 },
  { id: "h3", orderId: "TR-3740", date: "Oct 19", title: "Wheat Delivery", buyer: "Gov Grain Reserve",   weight: "12.5 Tons", payout: 1200 },
];

const WEEKLY = {
  earned: "$2,400",
  missions: 7,
  km: "312 km",
  onTime: "100%",
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function statusBadgeStyle(status: MissionStatus) {
  if (status === "In Progress") return { bg: "#d1fae5", text: "#047857" };
  if (status === "Upcoming")    return { bg: "#fef3c7", text: "#92400e" };
  return                               { bg: "#f3f4f6", text: "#6b7280" };
}

function cargoBadgeStyle(type: CargoType) {
  if (type === "Perishable") return { bg: "#dcfce7", text: "#166534", icon: "eco" as const };
  if (type === "Fragile")    return { bg: "#fef3c7", text: "#92400e", icon: "warning" as const };
  if (type === "Dry Goods")  return { bg: "#e0f2fe", text: "#075985", icon: "inventory-2" as const };
  return                            { bg: "#f3f4f6", text: "#374151", icon: "category" as const };
}

function accentColor(status: MissionStatus): string {
  if (status === "In Progress") return "#0df20d";
  if (status === "Upcoming")    return "#f59e0b";
  return "#9ca3af";
}

// ─── sub-components ───────────────────────────────────────────────────────────

/** Animated live dot */
const LiveDot = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.3, duration: 750, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(opacity, { toValue: 1,   duration: 750, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, [opacity]);
  return <Animated.View style={[styles.liveDot, { opacity }]} />;
};

/** Stepper for active mission */
const MissionStepper = ({ step }: { step: 0 | 1 | 2 }) => {
  const steps: Array<{ label: string }> = [
    { label: "Picked Up" },
    { label: "Transit" },
    { label: "Delivered" },
  ];
  return (
    <View style={styles.stepper}>
      {steps.map((s, i) => {
        const isDone   = i < step;
        const isActive = i === step;
        return (
          <React.Fragment key={s.label}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  isDone   && styles.stepCircleDone,
                  isActive && styles.stepCircleActive,
                  !isDone && !isActive && styles.stepCircleInactive,
                ]}
              >
                {isDone ? (
                  <MaterialIcons name="check" size={12} color="#065f46" />
                ) : isActive ? (
                  <MaterialIcons name="cached" size={12} color="#a7f3d0" />
                ) : null}
              </View>
              <Text style={styles.stepLabel}>{s.label}</Text>
            </View>
            {i < steps.length - 1 && (
              <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

/** Route visual with dashed vertical line */
const RouteVisual = ({
  pickup,
  dropoff,
  progress = 0,
}: {
  pickup: string;
  dropoff: string;
  progress?: number;
}) => (
  <View style={styles.routeVisual}>
    <View style={styles.routeLineTrack} />
    <View style={[styles.routeLineFill, { height: 52 * progress }]} />
    <View style={styles.routeStop}>
      <View style={styles.routeDotFrom} />
      <View style={{ flex: 1 }}>
        <Text style={styles.routeStopLabel}>Pickup</Text>
        <Text style={styles.routeStopName}>{pickup}</Text>
      </View>
    </View>
    <View style={{ height: 20 }} />
    <View style={styles.routeStop}>
      <View style={styles.routeDotTo} />
      <View style={{ flex: 1 }}>
        <Text style={styles.routeStopLabel}>Dropoff</Text>
        <Text style={styles.routeStopName}>{dropoff}</Text>
      </View>
    </View>
  </View>
);

/** Available route (dashed) */
const AvailRoute = ({ pickup, dropoff }: { pickup: string; dropoff: string }) => (
  <View style={styles.availRoute}>
    <View style={styles.availRouteLine} />
    <View style={styles.routeStop}>
      <View style={[styles.routeDotFrom, { backgroundColor: "#9ca3af" }]} />
      <Text style={styles.availStopText}>{pickup}</Text>
    </View>
    <View style={{ height: 14 }} />
    <View style={styles.routeStop}>
      <View style={styles.routeDotTo} />
      <Text style={styles.availStopText}>{dropoff}</Text>
    </View>
  </View>
);

// ─── map area ────────────────────────────────────────────────────────────────

const MapArea = () => (
  <View style={styles.mapArea}>
    {/* Grid pattern (simulated with nested views) */}
    <View style={[StyleSheet.absoluteFill, styles.mapGrid]} />
    <View style={styles.mapRoadH} />
    <View style={styles.mapRoadV} />
    <View style={styles.mapRiver} />

    {/* SVG route line */}
    <Svg style={StyleSheet.absoluteFill} viewBox="0 0 343 140">
      <Path
        d="M 120 52 Q 160 70 200 90"
        fill="none"
        stroke="#0df20d"
        strokeDasharray="6,4"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Circle cx={160} cy={72} r={4} fill="white" stroke="#0df20d" strokeWidth={2} />
    </Svg>

    {/* Pickup pin */}
    <View style={[styles.mapPin, { left: 108, top: 30 }]}>
      <View style={[styles.mapPinCircle, { backgroundColor: "#374151" }]}>
        <MaterialIcons name="agriculture" size={14} color="#fff" />
      </View>
      <View style={[styles.mapPinStem, { backgroundColor: "#374151" }]} />
    </View>

    {/* Dropoff pin */}
    <View style={[styles.mapPin, { left: 188, top: 56 }]}>
      <View style={[styles.mapPinCircle, { backgroundColor: "#0df20d" }]}>
        <MaterialIcons name="place" size={14} color="#065f46" />
      </View>
      <View style={[styles.mapPinStem, { backgroundColor: "#0df20d" }]} />
    </View>

    {/* ETA pill */}
    <View style={styles.mapEtaPill}>
      <View style={styles.mapLiveDot} />
      <Text style={styles.mapEtaText}>ETA 15 min</Text>
    </View>
  </View>
);

// ─── mission card ─────────────────────────────────────────────────────────────

const MissionCard = ({ mission }: { mission: Mission }) => {
  const badge = statusBadgeStyle(mission.status);
  const cargo = cargoBadgeStyle(mission.cargoType);
  const accent = accentColor(mission.status);

  const actionLabel =
    mission.status === "In Progress"
      ? "Continue"
      : mission.status === "Upcoming"
      ? "View Details"
      : "Receipt";

  const actionStyle =
    mission.status === "In Progress"
      ? styles.btnContinue
      : styles.btnView;

  return (
    <View style={styles.missionCard}>
      <View style={[styles.mcAccent, { backgroundColor: accent }]} />

      {/* Header */}
      <View style={styles.mcTop}>
        <View>
          <Text style={styles.mcOrderId}>{mission.orderId}</Text>
          <Text style={styles.mcTitle}>{mission.title}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.mcPayout}>${mission.payout.toLocaleString()}</Text>
          <Text style={styles.mcPayoutLbl}>Payout</Text>
        </View>
      </View>

      {/* Cargo pills */}
      <View style={styles.cargoPills}>
        <View style={[styles.cargoPill, { backgroundColor: cargo.bg }]}>
          <MaterialIcons name={cargo.icon} size={12} color={cargo.text} />
          <Text style={[styles.cargoPillText, { color: cargo.text }]}>{mission.cargoType}</Text>
        </View>
        <View style={styles.metaPill}>
          <MaterialIcons name="scale" size={11} color="#6b7280" />
          <Text style={styles.metaPillText}>{mission.weight}</Text>
        </View>
        <View style={styles.metaPill}>
          <MaterialIcons name="route" size={11} color="#6b7280" />
          <Text style={styles.metaPillText}>{mission.distance}</Text>
        </View>
        {mission.eta && (
          <View style={styles.metaPill}>
            <MaterialIcons name="schedule" size={11} color="#6b7280" />
            <Text style={styles.metaPillText}>{mission.eta}</Text>
          </View>
        )}
      </View>

      {/* Route */}
      <RouteVisual
        pickup={mission.pickup}
        dropoff={mission.dropoff}
        progress={mission.routeProgress}
      />

      {/* Footer */}
      <View style={styles.mcFooter}>
        <View style={[styles.mcBadge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.mcBadgeText, { color: badge.text }]}>{mission.status}</Text>
        </View>
        <TouchableOpacity style={[styles.actionBtn, actionStyle]}>
          <Text style={[
            styles.actionBtnText,
            mission.status === "In Progress" ? { color: "#065f46" } : { color: "#047857" },
          ]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── available card ───────────────────────────────────────────────────────────

const AvailableCard = ({
  mission,
  onAccept,
  onDecline,
}: {
  mission: AvailableMission;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) => {
  const cargo = cargoBadgeStyle(mission.cargoType);
  return (
    <View style={styles.availCard}>
      <View style={styles.mcTop}>
        <View>
          <View style={[styles.availBadge, { backgroundColor: cargo.bg }]}>
            <MaterialIcons name={cargo.icon} size={11} color={cargo.text} />
            <Text style={[styles.availBadgeText, { color: cargo.text }]}>{mission.cargoType}</Text>
          </View>
          <Text style={styles.mcTitle}>{mission.title}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.availEarn}>${mission.payout}</Text>
          <Text style={styles.mcPayoutLbl}>Est. pay</Text>
        </View>
      </View>

      <View style={styles.cargoPills}>
        <View style={styles.metaPill}>
          <MaterialIcons name="scale" size={11} color="#6b7280" />
          <Text style={styles.metaPillText}>{mission.weight}</Text>
        </View>
        <View style={styles.metaPill}>
          <MaterialIcons name="route" size={11} color="#6b7280" />
          <Text style={styles.metaPillText}>{mission.distance}</Text>
        </View>
        <View style={styles.metaPill}>
          <MaterialIcons name="schedule" size={11} color="#6b7280" />
          <Text style={styles.metaPillText}>{mission.eta}</Text>
        </View>
      </View>

      <AvailRoute pickup={mission.pickup} dropoff={mission.dropoff} />

      <View style={styles.availBtnRow}>
        <TouchableOpacity style={styles.declineBtn} onPress={() => onDecline(mission.id)}>
          <Text style={styles.declineBtnText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={() => onAccept(mission.id)}>
          <MaterialIcons name="check-circle" size={15} color="#065f46" />
          <Text style={styles.acceptBtnText}>Accept Mission</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── main screen ─────────────────────────────────────────────────────────────

export default function MissionManagementScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("missions");
  const [available, setAvailable] = useState(AVAILABLE_MISSIONS);

  const TABS: Array<{ key: TabKey; label: string }> = [
    { key: "missions",  label: `My Missions (${MY_MISSIONS.length})` },
    { key: "available", label: `Available (${available.length})` },
    { key: "history",   label: "History" },
  ];

  const handleAccept = (id: string) => {
    Alert.alert("Mission Accepted", "This mission has been added to your queue.", [
      { text: "OK", onPress: () => setAvailable((prev) => prev.filter((m) => m.id !== id)) },
    ]);
  };

  const handleDecline = (id: string) =>
    setAvailable((prev) => prev.filter((m) => m.id !== id));

  // active in-progress mission (first one)
  const activeMission = MY_MISSIONS.find((m) => m.status === "In Progress");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>

      {/* ── TOP BAR ── */}
      <View style={styles.topBar}>
        <View style={styles.tbRow}>
          <View>
            <Text style={styles.tbSubtitle}>MISSION CONTROL</Text>
            <Text style={styles.tbTitle}>AgriLogistics</Text>
          </View>
          <View style={styles.tbRight}>
            <View style={styles.onlinePill}>
              <LiveDot />
              <Text style={styles.onlineText}>Online</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <MaterialIcons name="notifications" size={18} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statMini}>
            <Text style={styles.statMiniLabel}>Earnings Today</Text>
            <Text style={styles.statMiniVal}>$450</Text>
            <Text style={styles.statMiniSub}>+12% vs yesterday</Text>
          </View>
          <View style={styles.statMini}>
            <Text style={styles.statMiniLabel}>Distance</Text>
            <Text style={styles.statMiniVal}>128 km</Text>
            <Text style={styles.statMiniSub}>4 missions done</Text>
          </View>
        </View>
      </View>

      {/* ── TABS ── */}
      <View style={styles.tabsWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabs}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* ── MY MISSIONS ── */}
      {activeTab === "missions" && (
        <FlatList
          data={MY_MISSIONS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              {/* MAP */}
              <MapArea />

              {/* ACTIVE MISSION CARD */}
              {activeMission && (
                <>
                  <Text style={styles.sectionHead}>Active Mission</Text>
                  <View style={styles.activeMissionCard}>
                    <View style={styles.amHeader}>
                      <Text style={styles.amId}>Mission #{activeMission.orderId}</Text>
                      <View style={styles.amTransitBadge}>
                        <Text style={styles.amTransitText}>In Transit</Text>
                      </View>
                    </View>
                    <Text style={styles.amTitle}>{activeMission.title}</Text>
                    <Text style={styles.amRoute}>
                      {activeMission.pickup} → {activeMission.dropoff}
                    </Text>
                    <MissionStepper step={1} />
                    <TouchableOpacity style={styles.updateStatusBtn}>
                      <Text style={styles.updateStatusText}>Update Status</Text>
                      <MaterialIcons name="arrow-forward" size={16} color="#065f46" />
                    </TouchableOpacity>
                  </View>
                </>
              )}

              <Text style={styles.sectionHead}>Upcoming</Text>
            </>
          }
          renderItem={({ item }) =>
            item.status !== "In Progress" ? <MissionCard mission={item} /> : null
          }
          ListFooterComponent={<View style={{ height: 24 }} />}
        />
      )}

      {/* ── AVAILABLE ── */}
      {activeTab === "available" && (
        <FlatList
          data={available}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.sectionHead}>
              Nearby Requests · {available.length} available
            </Text>
          }
          renderItem={({ item }) => (
            <AvailableCard
              mission={item}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="search-off" size={36} color="#d1d5db" />
              <Text style={styles.emptyTitle}>No missions nearby</Text>
              <Text style={styles.emptySub}>Check back soon or expand your search radius</Text>
            </View>
          }
          ListFooterComponent={<View style={{ height: 24 }} />}
        />
      )}

      {/* ── HISTORY ── */}
      {activeTab === "history" && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          <Text style={styles.sectionHead}>Completed This Week</Text>
          <View style={styles.historyCard}>
            {HISTORY_ITEMS.map((item, i) => (
              <View
                key={item.id}
                style={[
                  styles.historyRow,
                  i < HISTORY_ITEMS.length - 1 && styles.historyRowBorder,
                ]}
              >
                <View style={styles.historyIconBox}>
                  <MaterialIcons name="check-circle" size={18} color="#047857" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyOrderId}>{item.orderId} · {item.date}</Text>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <Text style={styles.historySub}>{item.buyer} · {item.weight}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.historyPayout}>+${item.payout.toLocaleString()}</Text>
                  <Text style={styles.historyDelivered}>Delivered</Text>
                </View>
              </View>
            ))}
          </View>

          {/* WEEKLY SUMMARY */}
          <Text style={styles.sectionHead}>Weekly Summary</Text>
          <View style={styles.weeklySummary}>
            <Text style={styles.weeklyHeading}>Performance</Text>
            <View style={styles.weeklyGrid}>
              {[
                { label: "Total Earned", value: WEEKLY.earned },
                { label: "Missions Done", value: String(WEEKLY.missions) },
                { label: "Km Driven", value: WEEKLY.km },
                { label: "On-Time", value: WEEKLY.onTime, highlight: true },
              ].map((s) => (
                <View key={s.label} style={styles.weeklyCell}>
                  <Text style={styles.weeklyCellLabel}>{s.label}</Text>
                  <Text style={[styles.weeklyCellVal, s.highlight && styles.weeklyCellHighlight]}>
                    {s.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// ─── styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#f5f8f5" },

  // ── TOP BAR
  topBar: {
    backgroundColor: "#047857",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },

  tbRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  tbSubtitle: {
    fontSize: 9,
    fontWeight: "700",
    color: "#a7f3d0",
    letterSpacing: 1,
    marginBottom: 2,
  },

  tbTitle: { fontSize: 20, fontWeight: "800", color: "#fff", letterSpacing: -0.5 },

  tbRight: { flexDirection: "row", alignItems: "center", gap: 8 },

  onlinePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#0df20d" },

  onlineText: { fontSize: 11, fontWeight: "700", color: "#fff" },

  notifBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  notifDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 1.5,
    borderColor: "#047857",
  },

  statsRow: { flexDirection: "row", gap: 10 },

  statMini: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 10,
  },

  statMiniLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#a7f3d0",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 3,
  },

  statMiniVal: { fontSize: 20, fontWeight: "800", color: "#fff", letterSpacing: -0.4 },
  statMiniSub: { fontSize: 10, color: "#a7f3d0", marginTop: 2 },

  // ── TABS
  tabsWrap: {
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e4efe4",
    paddingHorizontal: 16,
    paddingTop: 4,
  },

  tabs: { flexDirection: "row", gap: 0 },

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 2.5,
    borderBottomColor: "transparent",
    marginBottom: -0.5,
  },

  tabActive: { borderBottomColor: "#0df20d" },

  tabText: { fontSize: 12, fontWeight: "700", color: "#9ca3af" },
  tabTextActive: { color: "#047857" },

  // ── LIST
  listContent: { padding: 14, paddingTop: 14 },

  sectionHead: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 4,
  },

  // ── MAP
  mapArea: {
    height: 150,
    backgroundColor: "#e8f0e8",
    borderRadius: 16,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#d4e8d4",
  },

  mapGrid: {
    // RN can't do CSS background-image, so we leave the map as a tinted surface
    backgroundColor: "#eaf3ea",
  },

  mapRoadH: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "38%",
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 2,
  },

  mapRoadV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "52%",
    width: 8,
    backgroundColor: "#fff",
    borderRadius: 2,
  },

  mapRiver: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "22%",
    height: 14,
    backgroundColor: "#bfdbfe",
    borderRadius: 4,
    transform: [{ skewY: "-2deg" }],
  },

  mapPin: {
    position: "absolute",
    alignItems: "center",
  },

  mapPinCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  mapPinStem: {
    width: 3,
    height: 8,
    borderRadius: 2,
    marginTop: -2,
  },

  mapEtaPill: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: "rgba(4,120,87,0.92)",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  mapLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0df20d",
  },

  mapEtaText: { fontSize: 12, fontWeight: "800", color: "#fff" },

  // ── ACTIVE MISSION
  activeMissionCard: {
    backgroundColor: "#047857",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  amHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  amId: { fontSize: 10, fontWeight: "700", color: "#a7f3d0", letterSpacing: 0.4, textTransform: "uppercase" },

  amTransitBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },

  amTransitText: { fontSize: 10, fontWeight: "700", color: "#fff" },

  amTitle: { fontSize: 16, fontWeight: "800", color: "#fff", letterSpacing: -0.3, marginBottom: 2 },
  amRoute: { fontSize: 11, color: "#a7f3d0", marginBottom: 2 },

  // ── STEPPER
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },

  stepItem: { alignItems: "center", gap: 4 },

  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  stepCircleDone:     { backgroundColor: "#0df20d" },
  stepCircleActive:   { backgroundColor: "rgba(13,242,13,0.2)", borderWidth: 2, borderColor: "#0df20d" },
  stepCircleInactive: { backgroundColor: "rgba(255,255,255,0.1)", borderWidth: 2, borderColor: "rgba(255,255,255,0.2)" },

  stepLabel: { fontSize: 9, fontWeight: "600", color: "#a7f3d0" },

  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginHorizontal: 4,
    marginBottom: 14,
  },

  stepLineDone: { backgroundColor: "#0df20d" },

  updateStatusBtn: {
    backgroundColor: "#0df20d",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  updateStatusText: { fontSize: 14, fontWeight: "800", color: "#065f46" },

  // ── MISSION CARD
  missionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    overflow: "hidden",
  },

  mcAccent: { position: "absolute", left: 0, top: 0, bottom: 0, width: 4 },

  mcTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    paddingLeft: 20,
  },

  mcOrderId: { fontSize: 10, fontWeight: "700", color: "#047857", marginBottom: 2 },
  mcTitle: { fontSize: 15, fontWeight: "800", color: "#1a2e1a", letterSpacing: -0.2 },
  mcPayout: { fontSize: 18, fontWeight: "800", color: "#0df20d", letterSpacing: -0.4 },
  mcPayoutLbl: { fontSize: 9, color: "#9ca3af", textAlign: "right" },

  cargoPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingHorizontal: 16,
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 6,
  },

  cargoPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  cargoPillText: { fontSize: 11, fontWeight: "700" },

  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f8faf8",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
  },

  metaPillText: { fontSize: 11, fontWeight: "600", color: "#6b7280" },

  // ── ROUTE VISUAL
  routeVisual: {
    backgroundColor: "#f8faf8",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 10,
    position: "relative",
  },

  routeLineTrack: {
    position: "absolute",
    left: 20,
    top: 24,
    bottom: 24,
    width: 2,
    backgroundColor: "#e5e7eb",
    borderRadius: 1,
  },

  routeLineFill: {
    position: "absolute",
    left: 20,
    top: 24,
    width: 2,
    backgroundColor: "#0df20d",
    borderRadius: 1,
  },

  routeStop: { flexDirection: "row", alignItems: "center", gap: 10 },

  routeDotFrom: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6b7280",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 1,
  },

  routeDotTo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0df20d",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 1,
  },

  routeStopLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginBottom: 1,
  },

  routeStopName: { fontSize: 13, fontWeight: "700", color: "#1a2e1a" },

  mcFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#f3f4f6",
  },

  mcBadge: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  mcBadgeText: { fontSize: 10, fontWeight: "700" },

  actionBtn: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  btnContinue: { backgroundColor: "#0df20d" },
  btnView: { backgroundColor: "#f0faf0" },

  actionBtnText: { fontSize: 12, fontWeight: "800" },

  // ── AVAILABLE CARD
  availCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
  },

  availBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 4,
  },

  availBadgeText: { fontSize: 10, fontWeight: "700" },
  availEarn: { fontSize: 20, fontWeight: "800", color: "#0df20d", letterSpacing: -0.4 },

  availRoute: {
    backgroundColor: "#f8faf8",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    position: "relative",
  },

  availRouteLine: {
    position: "absolute",
    left: 17,
    top: 20,
    bottom: 20,
    width: 1.5,
    borderLeftWidth: 1.5,
    borderLeftColor: "#d1d5db",
    borderStyle: "dashed",
  },

  availStopText: { fontSize: 12, fontWeight: "600", color: "#374151" },

  availBtnRow: { flexDirection: "row", gap: 8 },

  declineBtn: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 11,
    alignItems: "center",
  },

  declineBtnText: { fontSize: 13, fontWeight: "700", color: "#6b7280" },

  acceptBtn: {
    flex: 2,
    backgroundColor: "#0df20d",
    borderRadius: 10,
    padding: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  acceptBtnText: { fontSize: 13, fontWeight: "800", color: "#065f46" },

  // ── HISTORY
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    overflow: "hidden",
    marginBottom: 14,
  },

  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },

  historyRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },

  historyIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  historyOrderId: { fontSize: 10, fontWeight: "700", color: "#9ca3af", marginBottom: 2 },
  historyTitle:   { fontSize: 14, fontWeight: "700", color: "#1a2e1a" },
  historySub:     { fontSize: 11, color: "#9ca3af", marginTop: 2 },

  historyPayout:    { fontSize: 16, fontWeight: "800", color: "#047857" },
  historyDelivered: { fontSize: 10, color: "#9ca3af", marginTop: 2 },

  // ── WEEKLY SUMMARY
  weeklySummary: {
    backgroundColor: "#047857",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  weeklyHeading: {
    fontSize: 10,
    fontWeight: "700",
    color: "#a7f3d0",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  weeklyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  weeklyCell: {
    width: "47%",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: 12,
  },

  weeklyCellLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#a7f3d0",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },

  weeklyCellVal:       { fontSize: 20, fontWeight: "800", color: "#fff", letterSpacing: -0.3 },
  weeklyCellHighlight: { color: "#0df20d" },

  // ── EMPTY STATE
  emptyState: {
    alignItems: "center",
    paddingVertical: 50,
    gap: 8,
  },

  emptyTitle: { fontSize: 15, fontWeight: "700", color: "#9ca3af" },
  emptySub:   { fontSize: 12, color: "#c4c4c4", textAlign: "center", paddingHorizontal: 32 },
});