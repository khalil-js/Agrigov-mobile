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
import { productApi } from "../../apis/product.api";
import { cartApi } from "../../apis/cart.api";
import { Alert, ActivityIndicator } from "react-native";

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
  const [addingToCart, setAddingToCart] = useState(false);

  const fetchProduct = async () => {
    try {
      const data: any = await productApi.detail(productId);
      
      const mappedProduct: Product = {
        id: data.id.toString(),
        name: data.ministry_product?.name || "Unknown Product",
        description: data.description,
        price: parseFloat(data.unit_price) || 0,
        unit: "kg",
        images: data.images?.length > 0 
          ? data.images.map((img: any) => img.image)
          : ["https://via.placeholder.com/400"],
        location: data.farm?.wilaya || "Unknown Location",
        grade: "A", // Default grade
        specifications: {
          Category: data.category_name || "N/A",
          Season: data.season || "N/A",
          Stock: `${data.stock} available`,
        },
        farmer: {
          name: data.farmer_name || "Unknown Farmer",
          rating: data.average_rating || 5.0,
          location: data.farm?.wilaya || "Unknown",
          avatar: "https://via.placeholder.com/100", // Add avatar logic if backend provides it
        },
      };

      setProduct(mappedProduct);
      setSelectedImage(mappedProduct.images[0]);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not fetch product details.");
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await cartApi.add(Number(product.id), Number(quantity));
      Alert.alert("Success", "Product added to cart!");
      navigation.getParent()?.navigate("Cart");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add product to cart.");
    } finally {
      setAddingToCart(false);
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
          onPress={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? <ActivityIndicator color="#000" /> : <Text>Add to Cart</Text>}
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