import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const [errors, setErrors] = useState({ identity: "", password: "" });

  const { login } = useAuth();
  const navigation = useNavigation<NavProp>();

  const validate = () => {
    let valid = true;
    const newErrors = { identity: "", password: "" };

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
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Top Brand Badge ── */}
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}>
            <MaterialIcons name="agriculture" size={22} color="#047857" />
          </View>
          <View>
            <Text style={styles.brandSub}>OFFICIAL MINISTRY PORTAL</Text>
            <Text style={styles.brandName}>AgriConnect DZ</Text>
          </View>
        </View>

        {/* ── Hero Section ── */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Connecting the{"\n"}
            <Text style={styles.heroAccent}>Agricultural Nation</Text>
          </Text>
          <Text style={styles.heroSub}>
            Real-time market data, transport logistics, and government support —
            all in one secure platform.
          </Text>

          {/* Role pills */}
          <View style={styles.roleRow}>
            {[
              { icon: "grass" as const, label: "Farmers" },
              { icon: "storefront" as const, label: "Buyers" },
              { icon: "local-shipping" as const, label: "Transporters" },
            ].map((r) => (
              <View key={r.label} style={styles.rolePill}>
                <MaterialIcons name={r.icon} size={13} color="#047857" />
                <Text style={styles.rolePillText}>{r.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Login Card ── */}
        <View style={styles.card}>
          {/* Card header */}
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <MaterialIcons name="lock-open" size={20} color="#047857" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Welcome Back</Text>
              <Text style={styles.cardSub}>Sign in to your account</Text>
            </View>
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View
            style={[
              styles.inputWrap,
              errors.identity ? styles.inputWrapError : null,
            ]}
          >
            <MaterialIcons name="mail-outline" size={18} color="#9ca3af" />
            <TextInput
              style={styles.inputField}
              placeholder="your@email.com"
              placeholderTextColor="#c0cfc0"
              value={identity}
              onChangeText={(t) => {
                setIdentity(t);
                setErrors((p) => ({ ...p, identity: "" }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {errors.identity ? (
            <Text style={styles.errorText}>{errors.identity}</Text>
          ) : null}

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View
            style={[
              styles.inputWrap,
              errors.password ? styles.inputWrapError : null,
            ]}
          >
            <MaterialIcons name="lock-outline" size={18} color="#9ca3af" />
            <TextInput
              style={styles.inputField}
              placeholder="Enter your password"
              placeholderTextColor="#c0cfc0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setErrors((p) => ({ ...p, password: "" }));
              }}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={18}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#065f46" />
            ) : (
              <>
                <Text style={styles.primaryBtnText}>Sign In</Text>
                <MaterialIcons name="arrow-forward" size={18} color="#065f46" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Register Link */}
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate("Register")}
          >
            <MaterialIcons name="person-add" size={18} color="#047857" />
            <Text style={styles.secondaryBtnText}>Create New Account</Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer ── */}
        <Text style={styles.footer}>
          Ministry of Agriculture · Algeria
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
  },

  scroll: {
    flexGrow: 1,
    padding: 16,
  },

  // ── BRAND
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
    marginTop: 4,
  },

  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
  },

  brandSub: {
    fontSize: 9,
    fontWeight: "700",
    color: "#047857",
    letterSpacing: 0.5,
  },

  brandName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.3,
  },

  // ── HERO
  hero: {
    marginBottom: 24,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.6,
    lineHeight: 34,
    marginBottom: 10,
  },

  heroAccent: {
    color: "#047857",
  },

  heroSub: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 19,
    marginBottom: 16,
  },

  roleRow: {
    flexDirection: "row",
    gap: 8,
  },

  rolePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#d1fae5",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  rolePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#047857",
  },

  // ── CARD
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    marginBottom: 16,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  cardIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.3,
  },

  cardSub: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 1,
  },

  // ── FORM
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
    letterSpacing: 0.1,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f8faf8",
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 4,
  },

  inputWrapError: {
    borderColor: "#ef4444",
    borderWidth: 1,
    backgroundColor: "#fff5f5",
  },

  inputField: {
    flex: 1,
    fontSize: 13,
    color: "#1a2e1a",
    padding: 0,
  },

  errorText: {
    fontSize: 11,
    color: "#ef4444",
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 2,
  },

  // ── BUTTONS
  primaryBtn: {
    backgroundColor: "#0df20d",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },

  primaryBtnDisabled: {
    backgroundColor: "#d1fae5",
  },

  primaryBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#065f46",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 14,
  },

  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#e4efe4",
  },

  dividerText: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
  },

  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#f0fdf4",
    borderWidth: 0.5,
    borderColor: "#d1fae5",
    borderRadius: 12,
    paddingVertical: 13,
  },

  secondaryBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#047857",
  },

  // ── FOOTER
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#c4c4c4",
    fontWeight: "600",
    marginBottom: 8,
  },
});