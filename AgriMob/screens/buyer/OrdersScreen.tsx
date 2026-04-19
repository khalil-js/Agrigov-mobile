import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Order } from "../../types/types";

/* 🇩🇿 Algerian Currency Formatter */
const formatDZD = (value: number) => {
  return value.toFixed(2) + " DZD";
};

const OrdersScreen = () => {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      order_id: "AG-8492",
      supplier: "Sunnydale Farms",
      product: "Wheat",
      quantity: "500kg",
      amount: 1250,
      status: "Delivered",
      date: "Oct 24",
    },
    {
      id: 2,
      order_id: "AG-8488",
      supplier: "Fertilizer Co",
      product: "NPK",
      quantity: "20 sacks",
      amount: 840,
      status: "In Transit",
      date: "Oct 20",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0]);
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.order_id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={[
        styles.orderCard,
        selectedOrder?.id === item.id && styles.selected,
      ]}
      onPress={() => setSelectedOrder(item)}
    >
      <View style={styles.orderLeft}>
        <Text style={styles.orderId}>#{item.order_id}</Text>

        <Text style={styles.product}>{item.product}</Text>

        <Text style={styles.text}>Supplier: {item.supplier}</Text>

        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.orderRight}>
        <Text style={styles.price}>{formatDZD(item.amount)}</Text>
        <StatusBadge status={item.status} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        placeholder="Search orders..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {/* Orders List */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={{ flex: 1 }}
        />
      )}

      {/* Invoice Panel */}
      {selectedOrder && (
        <ScrollView style={styles.invoice}>
          <Text style={styles.invoiceTitle}>
            Invoice #{selectedOrder.order_id}
          </Text>

          <Text style={styles.text}>Date: {selectedOrder.date}</Text>

          <Text style={styles.textBold}>
            Supplier: {selectedOrder.supplier}
          </Text>

          <View style={styles.divider} />

          <Row label="Product" value={selectedOrder.product} />
          <Row label="Quantity" value={selectedOrder.quantity} />
          <Row label="Transport" value={formatDZD(80)} />
          <Row label="Tax" value={formatDZD(20)} />

          <View style={styles.divider} />

          <Row label="Total" value={formatDZD(selectedOrder.amount)} bold />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Download Invoice</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const StatusBadge = ({ status }: any) => {
  const colors: any = {
    Delivered: "#4CAF50",
    "In Transit": "#2196F3",
    Pending: "#FFC107",
    Cancelled: "#F44336",
  };

  return (
    <View style={[styles.badge, { backgroundColor: colors[status] }]}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
};

const Row = ({ label, value, bold = false }: any) => (
  <View style={styles.row}>
    <Text style={bold ? styles.textBold : styles.text}>{label}</Text>
    <Text style={bold ? styles.textBold : styles.text}>{value}</Text>
  </View>
);

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 12,
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },

  selected: {
    borderWidth: 2,
    borderColor: "#0df20d",
  },

  orderLeft: {
    flex: 1,
  },

  orderRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  orderId: {
    fontWeight: "bold",
    fontSize: 14,
  },

  product: {
    fontWeight: "600",
    fontSize: 15,
    marginTop: 2,
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  text: {
    color: "#555",
  },

  textBold: {
    fontWeight: "bold",
  },

  price: {
    fontWeight: "bold",
    fontSize: 16,
  },

  badge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
  },

  invoice: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#0df20d",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});