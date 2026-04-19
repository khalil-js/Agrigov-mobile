import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { RegisterRole, WILAYAS, VEHICLE_TYPES } from "./resgister";

type NavProp = NativeStackNavigationProp<AuthStackParamList, "Register">;
type Step = 1 | 2 | 3;

const ROLE_ICONS: Record<
  RegisterRole,
  "agriculture" | "storefront" | "local-shipping"
> = {
  FARMER: "agriculture",
  BUYER: "storefront",
  TRANSPORTER: "local-shipping",
};

export default function RegisterScreen() {
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1
  const [role, setRole] = useState<RegisterRole | "">("");

  // Step 2
  const [email, setEmail]                   = useState("");
  const [username, setUsername]             = useState("");
  const [phone, setPhone]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]     = useState(false);

  // Step 3 — Farmer
  const [age, setAge]           = useState("");
  const [wilaya, setWilaya]     = useState("");
  const [baladiya, setBaladiya] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [address, setAddress]   = useState("");

  // Step 3 — Transporter
  const [vehicleType, setVehicleType]         = useState("");
  const [vehicleModel, setVehicleModel]       = useState("");
  const [vehicleYear, setVehicleYear]         = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register } = useAuth();
  const navigation = useNavigation<NavProp>();

  const roles: {
    name: RegisterRole;
    icon: "agriculture" | "storefront" | "local-shipping";
    label: string;
  }[] = [
    { name: "FARMER",      icon: "agriculture",    label: "Farmer"      },
    { name: "BUYER",       icon: "storefront",     label: "Buyer"       },
    { name: "TRANSPORTER", icon: "local-shipping", label: "Transporter" },
  ];

  // ─── Validation ─────────────────────────────────────────────────────────────

  const validateStep1 = () => {
    if (!role) {
      Alert.alert("Error", "Please select a role");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";

    if (!username.trim()) newErrors.username = "Username is required";
    if (!phone.trim())    newErrors.phone    = "Phone is required";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Min 8 characters";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (role === "FARMER") {
      // FIX: age validation was running for ALL roles but BUYER has no age field
      // in step 3, causing BUYER registrations to always fail at the final step.
      if (!age.trim()) newErrors.age = "Age is required";
      else if (isNaN(Number(age)) || Number(age) < 1)
        newErrors.age = "Valid age required";

      if (!wilaya.trim())   newErrors.wilaya   = "Wilaya is required";
      if (!baladiya.trim()) newErrors.baladiya = "Baladiya is required";
      if (!farmSize.trim()) newErrors.farmSize = "Farm size is required";
      else if (isNaN(Number(farmSize))) newErrors.farmSize = "Valid number required";
      if (!address.trim())  newErrors.address  = "Address is required";
    }

    if (role === "TRANSPORTER") {
      if (!age.trim()) newErrors.age = "Age is required";
      else if (isNaN(Number(age)) || Number(age) < 1)
        newErrors.age = "Valid age required";

      if (!vehicleType.trim())     newErrors.vehicleType     = "Vehicle type is required";
      if (!vehicleModel.trim())    newErrors.vehicleModel    = "Vehicle model is required";
      if (!vehicleYear.trim())     newErrors.vehicleYear     = "Year is required";
      if (!vehicleCapacity.trim()) newErrors.vehicleCapacity = "Capacity is required";
    }

    // BUYER: step 3 has no required fields — validation always passes
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────

  const handleRegister = async () => {
    if (!validateStep3()) return;
    if (!role) return;

    setIsLoading(true);
    const result = await register({
      email:    email.trim(),
      username: username.trim(),
      phone:    phone.trim(),
      role,
      password,
    });
    setIsLoading(false);

    if (result.success) {
      Alert.alert(
        "Registration Successful",
        "Please complete your profile in the next step.",
        [{ text: "OK" }],
      );
      // Navigation happens automatically via AuthContext → isAuthenticated
    } else {
      Alert.alert("Registration Failed", result.error);
    }
  };

  // ─── Step renderers ──────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Choose Your Role</Text>
      <Text style={styles.cardSubtitle}>Select how you want to use the platform</Text>

      <View style={styles.roleContainer}>
        {roles.map((r) => (
          <TouchableOpacity
            key={r.name}
            style={[styles.roleCard, role === r.name && styles.roleCardSelected]}
            onPress={() => setRole(r.name)}
          >
            <MaterialIcons
              name={r.icon}
              size={32}
              color={role === r.name ? "#13ec13" : "#6b7280"}
            />
            <Text style={[styles.roleLabel, role === r.name && styles.roleLabelSelected]}>
              {r.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.secondaryBtn}>
          <MaterialIcons name="arrow-back" size={18} />
          <Text style={{ marginLeft: 6 }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => validateStep1() && setStep(2)}
          style={styles.primaryBtn}
        >
          <Text style={{ fontWeight: "bold" }}>Continue</Text>
          <MaterialIcons name="arrow-forward" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Account Information</Text>
      <Text style={styles.cardSubtitle}>Create your account credentials</Text>

      <View style={styles.roleBadge}>
        <MaterialIcons name={ROLE_ICONS[role as RegisterRole]} size={18} color="#0df20d" />
        <Text style={{ marginLeft: 6 }}>Registering as: {role}</Text>
      </View>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={[styles.inputWithIcon, errors.email && styles.inputError]}>
        <MaterialIcons name="mail-outline" size={20} color="#9ca3af" />
        <TextInput
          style={{ flex: 1, padding: 8 }}
          placeholder="your@email.com"
          value={email}
          onChangeText={(t) => { setEmail(t); setErrors((p) => ({ ...p, email: "" })); }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <View style={[styles.inputWithIcon, errors.username && styles.inputError]}>
        <MaterialIcons name="person-outline" size={20} color="#9ca3af" />
        <TextInput
          style={{ flex: 1, padding: 8 }}
          placeholder="Choose a username"
          value={username}
          onChangeText={(t) => { setUsername(t); setErrors((p) => ({ ...p, username: "" })); }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      {/* Phone */}
      <Text style={styles.label}>Phone</Text>
      <View style={[styles.inputWithIcon, errors.phone && styles.inputError]}>
        <MaterialIcons name="phone" size={20} color="#9ca3af" />
        <TextInput
          style={{ flex: 1, padding: 8 }}
          placeholder="+213 XXX XXX XXX"
          value={phone}
          onChangeText={(t) => { setPhone(t); setErrors((p) => ({ ...p, phone: "" })); }}
          keyboardType="phone-pad"
        />
      </View>
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={[styles.inputWithIcon, errors.password && styles.inputError]}>
        <MaterialIcons name="lock-outline" size={20} color="#9ca3af" />
        <TextInput
          style={{ flex: 1, padding: 8 }}
          placeholder="Min 8 characters"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(t) => { setPassword(t); setErrors((p) => ({ ...p, password: "" })); }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={20}
            color="#9ca3af"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={[styles.inputWithIcon, errors.confirmPassword && styles.inputError]}>
        <MaterialIcons name="lock-outline" size={20} color="#9ca3af" />
        <TextInput
          style={{ flex: 1, padding: 8 }}
          placeholder="Repeat your password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={(t) => { setConfirmPassword(t); setErrors((p) => ({ ...p, confirmPassword: "" })); }}
        />
      </View>
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setStep(1)} style={styles.secondaryBtn}>
          <MaterialIcons name="arrow-back" size={18} />
          <Text style={{ marginLeft: 6 }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => validateStep2() && setStep(3)}
          style={styles.primaryBtn}
        >
          <Text style={{ fontWeight: "bold" }}>Continue</Text>
          <MaterialIcons name="arrow-forward" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Profile Details</Text>
      <Text style={styles.cardSubtitle}>Almost done — a few more details</Text>

      {/* BUYER: nothing required here */}
      {role === "BUYER" && (
        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={20} color="#6b7280" />
          <Text style={styles.infoText}>
            No extra details needed for buyers. Hit "Create Account" to finish!
          </Text>
        </View>
      )}

      {/* FARMER fields */}
      {role === "FARMER" && (
        <>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            placeholder="Your age"
            value={age}
            onChangeText={(t) => { setAge(t); setErrors((p) => ({ ...p, age: "" })); }}
            keyboardType="numeric"
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

          <Text style={styles.label}>Wilaya</Text>
          <TextInput
            style={[styles.input, errors.wilaya && styles.inputError]}
            placeholder="e.g. Alger"
            value={wilaya}
            onChangeText={(t) => { setWilaya(t); setErrors((p) => ({ ...p, wilaya: "" })); }}
          />
          {errors.wilaya && <Text style={styles.errorText}>{errors.wilaya}</Text>}

          <Text style={styles.label}>Baladiya</Text>
          <TextInput
            style={[styles.input, errors.baladiya && styles.inputError]}
            placeholder="Your municipality"
            value={baladiya}
            onChangeText={(t) => { setBaladiya(t); setErrors((p) => ({ ...p, baladiya: "" })); }}
          />
          {errors.baladiya && <Text style={styles.errorText}>{errors.baladiya}</Text>}

          <Text style={styles.label}>Farm Size (hectares)</Text>
          <TextInput
            style={[styles.input, errors.farmSize && styles.inputError]}
            placeholder="e.g. 5"
            value={farmSize}
            onChangeText={(t) => { setFarmSize(t); setErrors((p) => ({ ...p, farmSize: "" })); }}
            keyboardType="numeric"
          />
          {errors.farmSize && <Text style={styles.errorText}>{errors.farmSize}</Text>}

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, errors.address && styles.inputError]}
            placeholder="Detailed address"
            value={address}
            onChangeText={(t) => { setAddress(t); setErrors((p) => ({ ...p, address: "" })); }}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        </>
      )}

      {/* TRANSPORTER fields */}
      {role === "TRANSPORTER" && (
        <>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            placeholder="Your age"
            value={age}
            onChangeText={(t) => { setAge(t); setErrors((p) => ({ ...p, age: "" })); }}
            keyboardType="numeric"
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

          <Text style={styles.label}>Vehicle Type</Text>
          <TextInput
            style={[styles.input, errors.vehicleType && styles.inputError]}
            placeholder="e.g. Truck, Van"
            value={vehicleType}
            onChangeText={(t) => { setVehicleType(t); setErrors((p) => ({ ...p, vehicleType: "" })); }}
          />
          {errors.vehicleType && <Text style={styles.errorText}>{errors.vehicleType}</Text>}

          <Text style={styles.label}>Vehicle Model</Text>
          <TextInput
            style={[styles.input, errors.vehicleModel && styles.inputError]}
            placeholder="e.g. Mercedes Actros"
            value={vehicleModel}
            onChangeText={(t) => { setVehicleModel(t); setErrors((p) => ({ ...p, vehicleModel: "" })); }}
          />
          {errors.vehicleModel && <Text style={styles.errorText}>{errors.vehicleModel}</Text>}

          <Text style={styles.label}>Vehicle Year</Text>
          <TextInput
            style={[styles.input, errors.vehicleYear && styles.inputError]}
            placeholder="e.g. 2022"
            value={vehicleYear}
            onChangeText={(t) => { setVehicleYear(t); setErrors((p) => ({ ...p, vehicleYear: "" })); }}
            keyboardType="numeric"
          />
          {errors.vehicleYear && <Text style={styles.errorText}>{errors.vehicleYear}</Text>}

          <Text style={styles.label}>Vehicle Capacity (Tonnes)</Text>
          <TextInput
            style={[styles.input, errors.vehicleCapacity && styles.inputError]}
            placeholder="e.g. 15"
            value={vehicleCapacity}
            onChangeText={(t) => { setVehicleCapacity(t); setErrors((p) => ({ ...p, vehicleCapacity: "" })); }}
            keyboardType="numeric"
          />
          {errors.vehicleCapacity && (
            <Text style={styles.errorText}>{errors.vehicleCapacity}</Text>
          )}
        </>
      )}

      <View style={styles.infoBox}>
        <MaterialIcons name="info-outline" size={20} color="#6b7280" />
        <Text style={styles.infoText}>
          Document upload will be available after registration. You can complete
          your profile in the settings.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setStep(2)} style={styles.secondaryBtn}>
          <MaterialIcons name="arrow-back" size={18} />
          <Text style={{ marginLeft: 6 }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.primaryBtn, isLoading && { backgroundColor: "#9ca3af" }]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Text style={{ fontWeight: "bold" }}>Create Account</Text>
              <MaterialIcons name="check" size={18} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#f5f8f5", padding: 16 }}
    >
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Create Account</Text>
        <Text style={{ color: "#6b7280", marginTop: 4 }}>
          Step {step} of 3 —{" "}
          {step === 1 ? "Choose Role" : step === 2 ? "Account Info" : "Profile"}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card:            { backgroundColor: "#fff", borderRadius: 20, padding: 20, elevation: 4 },
  cardTitle:       { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  cardSubtitle:    { color: "#6b7280", marginBottom: 16 },
  roleContainer:   { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  roleCard:        {
    flex: 1, alignItems: "center", paddingVertical: 20, marginHorizontal: 4,
    borderRadius: 12, backgroundColor: "rgba(243,244,246,0.5)",
    borderWidth: 1, borderColor: "transparent",
  },
  roleCardSelected: { backgroundColor: "#fff", borderColor: "#13ec13" },
  roleLabel:        { fontSize: 12, fontWeight: "bold", marginTop: 8, color: "#6b7280" },
  roleLabelSelected: { color: "#13ec13" },
  roleBadge: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(13,242,13,0.1)", padding: 8,
    borderRadius: 20, marginBottom: 20,
  },
  label:         { fontWeight: "500", marginBottom: 4 },
  input:         { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, padding: 10, marginBottom: 8 },
  inputWithIcon: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: "#d1d5db",
    borderRadius: 12, paddingHorizontal: 8, marginBottom: 8,
  },
  inputError:    { borderColor: "red" },
  errorText:     { color: "red", marginBottom: 8, marginTop: -4, fontSize: 12 },
  progressBar:   { height: 8, backgroundColor: "#e5e7eb", borderRadius: 10, overflow: "hidden", marginBottom: 20 },
  progressFill:  { backgroundColor: "#0df20d", height: "100%" },
  buttonRow:     { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  primaryBtn:    {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#0df20d", paddingVertical: 12,
    paddingHorizontal: 20, borderRadius: 12,
  },
  secondaryBtn:  {
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: "#d1d5db",
    paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12,
  },
  infoBox:  { flexDirection: "row", alignItems: "flex-start", backgroundColor: "#f3f4f6", padding: 12, borderRadius: 8, marginTop: 16 },
  infoText: { flex: 1, marginLeft: 8, color: "#6b7280", fontSize: 12 },
});