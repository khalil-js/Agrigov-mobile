import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InventoryStackParamList } from "../../navigation/FarmerTabNavigator";

export default function AddProductScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<InventoryStackParamList>>();
  const [form, setForm] = useState({
    category: "Grains",
    variety: "",
    quantity: "",
    price: "",
    date: "",
    storage: "Cold",
  });

  const handleSave = () => {
    // TODO: Save to backend
    navigation.goBack();
  };

  const handlePublish = () => {
    // TODO: Publish to backend
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Add New Product</Text>
        <Text style={styles.subtitle}>Step 2 of 4 • 50% Complete</Text>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* CATEGORY */}
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={form.category}
          onChangeText={(text) => setForm({ ...form, category: text })}
        />

        {/* VARIETY */}
        <Text style={styles.label}>Variety / Grade</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Grade A"
          onChangeText={(text) => setForm({ ...form, variety: text })}
        />

        {/* QUANTITY */}
        <Text style={styles.label}>Quantity (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0"
          onChangeText={(text) => setForm({ ...form, quantity: text })}
        />

        {/* PRICE */}
        <Text style={styles.label}>Price per kg</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.00"
          onChangeText={(text) => setForm({ ...form, price: text })}
        />

        {/* DATE */}
        <Text style={styles.label}>Harvest Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          onChangeText={(text) => setForm({ ...form, date: text })}
        />

        {/* STORAGE */}
        <Text style={styles.label}>Storage</Text>
        <TextInput
          style={styles.input}
          placeholder="Cold / Dry"
          onChangeText={(text) => setForm({ ...form, storage: text })}
        />

        {/* IMAGE UPLOAD */}
        <View style={styles.uploadBox}>
          <MaterialIcons name="add-a-photo" size={30} color="#0df20d" />
          <Text style={styles.uploadText}>Upload Images</Text>
        </View>

        {/* WARNING */}
        <View style={styles.warning}>
          <MaterialIcons name="warning" size={20} color="orange" />
          <Text style={styles.warningText}>
            Price should be close to official market price
          </Text>
        </View>

        {/* BUTTONS */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleSave}>
            <Text>Save Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={handlePublish}>
            <Text style={{ fontWeight: "bold" }}>Publish</Text>
          </TouchableOpacity>
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

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginTop: 4,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
  },

  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: "#0df20d",
    borderRadius: 10,
  },

  form: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
  },

  label: {
    marginTop: 10,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },

  uploadBox: {
    marginTop: 20,
    padding: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#0df20d",
    borderRadius: 10,
    alignItems: "center",
  },

  uploadText: {
    marginTop: 10,
    color: "#555",
  },

  warning: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#fff3cd",
    padding: 10,
    borderRadius: 8,
  },

  warningText: {
    marginLeft: 10,
    fontSize: 12,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  primaryBtn: {
    backgroundColor: "#0df20d",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },

  secondaryBtn: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
});
