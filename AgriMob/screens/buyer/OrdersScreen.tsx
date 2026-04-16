// OrdersScreen.tsx
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
import { Order } from "../types";

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

  return (
    <View style={styles.container}>
      {/* 🔍 Search */}
      <TextInput
        placeholder="Search orders..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {/* 📋 Orders List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.orderCard,
              selectedOrder?.id === item.id && styles.selected,
            ]}
            onPress={() => setSelectedOrder(item)}
          >
            <View>
              <Text style={styles.orderId}>#{item.order_id}</Text>
              <Text style={styles.text}>{item.supplier}</Text>
              <Text style={styles.text}>
                {item.product} • {item.quantity}
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>${item.amount}</Text>
              <StatusBadge status={item.status} />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* 📄 Invoice Panel */}
      {selectedOrder && (
        <ScrollView style={styles.invoice}>
          <Text style={styles.invoiceTitle}>
            Invoice #{selectedOrder.order_id}
          </Text>

          <Text style={styles.textBold}>
            Supplier: {selectedOrder.supplier}
          </Text>

          <View style={styles.divider} />

          <Row label="Product" value={selectedOrder.product} />
          <Row label="Quantity" value={selectedOrder.quantity} />
          <Row label="Transport" value="$80" />
          <Row label="Tax" value="$20" />

          <View style={styles.divider} />

          <Row
            label="Total"
            value={`$${selectedOrder.amount}`}
            bold
          />

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
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selected: {
    borderWidth: 2,
    borderColor: "#0df20d",
  },

  orderId: {
    fontWeight: "bold",
  },

  text: {
    color: "#555",
  },

  textBold: {
    fontWeight: "bold",
  },

  price: {
    fontWeight: "bold",
  },

  badge: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
  },

  invoice: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  invoiceTitle: {
    fontSize: 18,
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
});

/*useEffect(() => {
  fetch("http://your-api.com/api/orders/")
    .then(res => res.json())
    .then(data => setOrders(data));
}, []);
# models.py
class Order(models.Model):
    buyer = models.ForeignKey(User)
    supplier = models.CharField(max_length=255)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)*/