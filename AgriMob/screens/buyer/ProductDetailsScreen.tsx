import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketStackParamList } from "../../navigation/BuyerTabNavigator";
import { api } from "../../api/client";

/* 🇩🇿 Currency formatter */
const formatDZD = (value: number) => {
  return value.toFixed(2) + " DZD";
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  images: string[];
  location: string;
  grade: string;
  specifications: Record<string, string>;
  farmer: {
    name: string;
    rating: number;
    location: string;
    avatar: string;
  };
}

const ProductDetailsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const route = useRoute();
  const { productId } = route.params as { productId: string };

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState("10");
  const [activeTab, setActiveTab] = useState("specs");

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${productId}/`);
      const data = res.data;
      setProduct(data);
      setSelectedImage(data.images[0]);
    } catch (err) {
      console.log(err);

      const staticProduct: Product = {
        id: productId,
        name: "Fresh Tomatoes",
        description:
          "Organic red tomatoes from local farms. Perfect for salads and cooking.",
        price: 2.5,
        unit: "kg",
        images: ["https://via.placeholder.com/400"],
        location: "Algiers",
        grade: "A",
        specifications: {
          Type: "Roma",
          Origin: "Local Farm",
          "Shelf Life": "7 days",
        },
        farmer: {
          name: "Ahmed Farm",
          rating: 4.5,
          location: "Algiers",
          avatar: "https://via.placeholder.com/100",
        },
      };

      setProduct(staticProduct);
      setSelectedImage(staticProduct.images[0]);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <Text style={{ marginTop: 50 }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Product Gallery */}
      <Image source={{ uri: selectedImage }} style={styles.mainImage} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product.images.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
            <Image
              source={{ uri: img }}
              style={[
                styles.thumbnail,
                selectedImage === img && styles.activeThumb,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Info */}
      <View style={styles.section}>
        <Text style={styles.title}>{product.name}</Text>

        <Text style={styles.price}>
          {formatDZD(product.price)} / {product.unit}
        </Text>

        <Text style={styles.location}>📍 {product.location}</Text>

        <Text style={styles.grade}>Grade: {product.grade}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("specs")}>
          <Text style={[styles.tab, activeTab === "specs" && styles.activeTab]}>
            Specifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("details")}>
          <Text
            style={[styles.tab, activeTab === "details" && styles.activeTab]}
          >
            Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.section}>
        {activeTab === "specs" &&
          Object.entries(product.specifications).map(([key, value]) => (
            <View key={key} style={styles.specRow}>
              <Text style={styles.specKey}>{key}</Text>
              <Text style={styles.specValue}>{value}</Text>
            </View>
          ))}

        {activeTab === "details" && (
          <Text style={styles.description}>{product.description}</Text>
        )}
      </View>

      {/* Farmer Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farmer</Text>

        <View style={styles.farmerRow}>
          <Image
            source={{ uri: product.farmer.avatar }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.farmerName}>{product.farmer.name}</Text>
            <Text style={styles.farmerInfo}>
              📍 {product.farmer.location}
            </Text>
            <Text style={styles.farmerInfo}>
              ⭐ {product.farmer.rating}
            </Text>
          </View>
        </View>
      </View>

      {/* Order Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order</Text>

        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.btnText}>Buy Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.getParent()?.navigate("Cart")}
        >
          <Text>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8f5",
  },

  mainImage: {
    width: "100%",
    height: 250,
  },

  thumbnail: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 8,
  },

  activeThumb: {
    borderWidth: 2,
    borderColor: "#0df20d",
  },

  section: {
    padding: 15,
    backgroundColor: "#fff",
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },

  location: {
    color: "#555",
  },

  grade: {
    color: "#0df20d",
    fontWeight: "600",
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginTop: 10,
  },

  tab: {
    padding: 10,
    color: "#888",
  },

  activeTab: {
    color: "#0df20d",
    fontWeight: "bold",
  },

  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  specKey: {
    color: "#666",
  },

  specValue: {
    fontWeight: "600",
  },

  description: {
    color: "#555",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  farmerRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  farmerName: {
    fontWeight: "bold",
  },

  farmerInfo: {
    fontSize: 12,
    color: "#555",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  primaryBtn: {
    backgroundColor: "#0df20d",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: {
    fontWeight: "bold",
  },
});