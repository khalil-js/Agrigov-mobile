// CheckoutScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { Product, Transporter } from "../types";

const CheckoutScreen = () => {
  // 🟢 Mock data (replace with API from Django)
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Maize",
      farmer_name: "Ali Farm",
      price: 2500,
      quantity: 100,
      unit: "sacks",
      image: "https://via.placeholder.com/100",
    },
  ]);

  const [transporters] = useState<Transporter[]>([
    {
      id: 1,
      name: "Agro Logistics",
      rating: 4.8,
      price: 120,
      delivery_time: "2 Days",
    },
    {
      id: 2,
      name: "Farm Express",
      rating: 4.5,
      price: 90,
      delivery_time: "4 Days",
    },
  ]);

  const [selectedTransporter, setSelectedTransporter] =
    useState<Transporter>(transporters[0]);

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  // 🧮 Calculations
  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + selectedTransporter.price;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* 📍 Delivery Address */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.textBold}>Farm Warehouse</Text>
        <Text style={styles.text}>Jijel, Algeria</Text>
        <Text style={styles.text}>+213 XXX XXX</Text>
      </View>

      {/* 🚚 Transporters */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Select Transporter</Text>

        {transporters.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[
              styles.transporter,
              selectedTransporter.id === t.id && styles.selected,
            ]}
            onPress={() => setSelectedTransporter(t)}
          >
            <View>
              <Text style={styles.textBold}>{t.name}</Text>
              <Text style={styles.text}>
                ⭐ {t.rating} • {t.delivery_time}
              </Text>
            </View>

            <Text style={styles.price}>${t.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 💳 Payment */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <TextInput
          placeholder="Card Number"
          style={styles.input}
          value={card.number}
          onChangeText={(v) => setCard({ ...card, number: v })}
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TextInput
            placeholder="MM/YY"
            style={[styles.input, { flex: 1 }]}
            value={card.expiry}
            onChangeText={(v) => setCard({ ...card, expiry: v })}
          />
          <TextInput
            placeholder="CVC"
            style={[styles.input, { flex: 1 }]}
            value={card.cvc}
            onChangeText={(v) => setCard({ ...card, cvc: v })}
          />
        </View>

        <TextInput
          placeholder="Name on Card"
          style={styles.input}
          value={card.name}
          onChangeText={(v) => setCard({ ...card, name: v })}
        />
      </View>

      {/* 🧾 Order Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        {products.map((p) => (
          <View key={p.id} style={styles.productRow}>
            <Image source={{ uri: p.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>{p.name}</Text>
              <Text style={styles.text}>
                {p.quantity} {p.unit}
              </Text>
            </View>
            <Text style={styles.price}>${p.price * p.quantity}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <Row label="Subtotal" value={`$${subtotal}`} />
        <Row
          label="Transport"
          value={`$${selectedTransporter.price}`}
        />

        <Row label="Total" value={`$${total}`} bold />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Row = ({ label, value, bold = false }: any) => (
  <View style={styles.row}>
    <Text style={bold ? styles.textBold : styles.text}>{label}</Text>
    <Text style={bold ? styles.textBold : styles.text}>{value}</Text>
  </View>
);

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    color: "#555",
  },

  textBold: {
    fontWeight: "bold",
  },

  transporter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },

  selected: {
    borderColor: "#0df20d",
    backgroundColor: "#eaffea",
  },

  price: {
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
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
    backgroundColor: "#0df20d",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
  },
});