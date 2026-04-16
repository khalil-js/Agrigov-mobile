import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";

type Role = "FARMER" | "BUYER";

export default function RoleSelectionScreen() {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { setUser } = useAuth();

  const handleContinue = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    if (!selectedRole) {
      Alert.alert("Error", "Please select a role");
      return;
    }

    // Create a mock user with the selected role
    const mockUser = {
      id: Date.now(),
      email: email.trim(),
      username: email.split("@")[0],
      phone: "1234567890",
      role: selectedRole,
      is_verified: true,
      is_active: true,
      created_at: new Date().toISOString(),
    };

    setUser(mockUser);
  };

  const roles = [
    {
      key: "BUYER" as Role,
      title: "Buyer",
      subtitle: "Purchase agricultural products",
      icon: "shopping-cart" as keyof typeof MaterialIcons.glyphMap,
      color: "#4CAF50",
    },
    {
      key: "FARMER" as Role,
      title: "Farmer",
      subtitle: "Sell your agricultural products",
      icon: "agriculture" as keyof typeof MaterialIcons.glyphMap,
      color: "#FF9800",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AgriGov</Text>
        <Text style={styles.subtitle}>Choose your role to continue</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Select Role</Text>
        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.key}
              style={[
                styles.roleCard,
                selectedRole === role.key && styles.selectedRoleCard,
              ]}
              onPress={() => setSelectedRole(role.key)}
            >
              <MaterialIcons
                name={role.icon}
                size={32}
                color={selectedRole === role.key ? "#fff" : role.color}
              />
              <Text
                style={[
                  styles.roleTitle,
                  selectedRole === role.key && styles.selectedRoleText,
                ]}
              >
                {role.title}
              </Text>
              <Text
                style={[
                  styles.roleSubtitle,
                  selectedRole === role.key && styles.selectedRoleText,
                ]}
              >
                {role.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  rolesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  roleCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  selectedRoleCard: {
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50",
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
    marginTop: 12,
  },
  roleSubtitle: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
    marginTop: 4,
  },
  selectedRoleText: {
    color: "#fff",
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 40,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
