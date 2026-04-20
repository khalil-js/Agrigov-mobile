import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketStackParamList } from "../../navigation/BuyerTabNavigator";
import { productApi } from "../../apis/product.api";

const formatDZD = (value: number) =>
  new Intl.NumberFormat("fr-DZ").format(value) + " DZD";

const CATEGORIES = ["All", "Vegetables", "Grains", "Fruits", "Legumes", "Dairy"];

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  location: string;
  grade: string;
}

export default function ProductCatalogScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await productApi.list("");
        const results = response.results ? response.results : response;
        const mapped = results.map((item: any) => ({
          id: item.id.toString(),
          name: item.ministry_product?.name || "Unknown Product",
          category: item.category_name || "Uncategorized",
          description: item.description,
          price: parseFloat(item.unit_price) || 0,
          unit: "kg",
          image: item.images?.[0]?.image || "https://via.placeholder.com/200",
          location: item.farm?.wilaya || "Unknown Location",
          grade: "A",
        }));
        setProducts(mapped);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All" ||
      p.category.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.cardBody}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardMeta}>
          <View style={styles.locationRow}>
            <MaterialIcons name="place" size={12} color="#6b7280" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.gradePill}>
            <Text style={styles.gradeText}>Grade {item.grade}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardPrice}>{formatDZD(item.price)}</Text>
            <Text style={styles.cardUnit}>per {item.unit}</Text>
          </View>
          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() =>
              navigation.navigate("ProductDetails", { productId: item.id })
            }
          >
            <Text style={styles.orderBtnText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
        <ActivityIndicator size="large" color="#0df20d" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topBarSub}>AGRIMARKET</Text>
          <Text style={styles.topBarTitle}>Marketplace</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="tune" size={18} color="#047857" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <MaterialIcons name="search" size={16} color="#9ca3af" />
        <TextInput
          placeholder="Search products, farms…"
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <MaterialIcons name="close" size={16} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryPill,
              activeCategory === cat && styles.categoryPillActive,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryPillText,
                activeCategory === cat && styles.categoryPillTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results count */}
      <Text style={styles.resultsCount}>
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={36} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySub}>
              Try a different search or category
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

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

  // ── TOP BAR
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },

  topBarSub: {
    fontSize: 10,
    fontWeight: "700",
    color: "#047857",
    letterSpacing: 0.5,
    marginBottom: 2,
  },

  topBarTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.4,
  },

  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── SEARCH
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#1a2e1a",
    padding: 0,
  },

  // ── CATEGORY PILLS
  categoryRow: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },

  categoryPill: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#e4efe4",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  categoryPillActive: {
    backgroundColor: "#d1fae5",
    borderColor: "#a7f3d0",
  },

  categoryPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
  },

  categoryPillTextActive: {
    color: "#047857",
  },

  resultsCount: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9ca3af",
    paddingHorizontal: 16,
    marginBottom: 6,
  },

  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 16,
  },

  // ── PRODUCT CARD
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "#e4efe4",
  },

  cardImage: {
    width: "100%",
    height: 150,
  },

  cardBody: {
    padding: 14,
  },

  cardCategory: {
    fontSize: 10,
    fontWeight: "800",
    color: "#047857",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 3,
  },

  cardName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.2,
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 17,
    marginBottom: 10,
  },

  cardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  locationText: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "600",
  },

  gradePill: {
    backgroundColor: "#d1fae5",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  gradeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#047857",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a2e1a",
    letterSpacing: -0.3,
  },

  cardUnit: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 1,
  },

  orderBtn: {
    backgroundColor: "#0df20d",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },

  orderBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#065f46",
  },

  // ── EMPTY
  emptyState: {
    alignItems: "center",
    paddingVertical: 50,
    gap: 8,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#9ca3af",
  },

  emptySub: {
    fontSize: 12,
    color: "#c4c4c4",
    textAlign: "center",
  },
});