import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

type NavProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    identity: "",
    password: "",
  });

  const { login } = useAuth();
  const navigation = useNavigation<NavProp>();

  const validate = () => {
    let valid = true;
    let newErrors = { identity: "", password: "" };

    if (!identity.trim()) {
      newErrors.identity = "Email is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);
    const result = await login(identity.trim(), password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert("Login Failed", result.error);
    }
    // Navigation happens automatically via AuthContext
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#f6f8f6",
        padding: 16,
        justifyContent: "center",
      }}
    >
      {/* Left Hero Section */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 12, fontWeight: "500", marginBottom: 8 }}>
          Official Ministry Portal
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 12 }}>
          Connecting the{"\n"}
          <Text style={{ color: "#13ec13" }}>Agricultural Nation</Text>
        </Text>
        <Text style={{ fontSize: 16, color: "#4b5563" }}>
          Access real-time market data, transport logistics, and government
          support schemes all in one secure platform.
        </Text>
      </View>

      {/* Login Card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: "rgba(19,236,19,0.1)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <MaterialIcons name="agriculture" size={32} color="#13ec13" />
          </View>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome Back</Text>
          <Text style={{ color: "#6b7280", marginTop: 4 }}>
            Sign in to access your dashboard
          </Text>
        </View>

        {/* Form */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 4, fontSize: 14, fontWeight: "500" }}>
            Email
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: errors.identity ? "red" : "#d1d5db",
              borderRadius: 12,
              paddingHorizontal: 8,
            }}
          >
            <MaterialIcons name="mail-outline" size={20} color="#9ca3af" />
            <TextInput
              style={{ flex: 1, padding: 8 }}
              placeholder="Enter your email"
              value={identity}
              onChangeText={(text) => {
                setIdentity(text);
                setErrors((prev) => ({ ...prev, identity: "" }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {errors.identity ? (
            <Text style={{ color: "red", marginBottom: 8, marginTop: 4 }}>
              {errors.identity}
            </Text>
          ) : null}
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 4, fontSize: 14, fontWeight: "500" }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: errors.password ? "red" : "#d1d5db",
              borderRadius: 12,
              paddingHorizontal: 8,
            }}
          >
            <MaterialIcons name="lock-outline" size={20} color="#9ca3af" />
            <TextInput
              style={{ flex: 1, padding: 8 }}
              placeholder="Enter your secure password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>
          {errors.password ? (
            <Text style={{ color: "red", marginBottom: 8, marginTop: 4 }}>
              {errors.password}
            </Text>
          ) : null}
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isLoading ? "#9ca3af" : "#13ec13",
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 8,
          }}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={{ fontWeight: "bold", color: "#000" }}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        {/* Registration Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 12,
          }}
        >
          <MaterialIcons
            name="app-registration"
            size={20}
            color="#13ec13"
            style={{ marginRight: 8 }}
          />
          <Text style={{ fontWeight: "500", color: "#374151" }}>
            Register New Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}