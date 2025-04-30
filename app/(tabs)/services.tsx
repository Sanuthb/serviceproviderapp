import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const allServices = [
  {
    id: "1",
    category: "Cleaning",
    title: "Home Cleaning",
    provider: "Hema Watson",
    rating: 4.5,
    price: "$24/hour",
    image: "https://images.pexels.com/photos/4239034/pexels-photo-4239034.jpeg",
  },
  {
    id: "2",
    category: "Gardening",
    title: "Garden Maintenance",
    provider: "Saloni Sam",
    rating: 4.0,
    price: "$18/hour",
    image: "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg",
  },
  {
    id: "3",
    category: "Repairing",
    title: "AC Repair",
    provider: "John Fixer",
    rating: 4.8,
    price: "$30/hour",
    image: "https://images.pexels.com/photos/3771113/pexels-photo-3771113.jpeg",
  },
  {
    id: "4",
    category: "Painting",
    title: "Wall Painting",
    provider: "Artist Riya",
    rating: 4.2,
    price: "$22/hour",
    image: "https://images.pexels.com/photos/1573823/pexels-photo-1573823.jpeg",
  },
  {
    id: "5",
    category: "Laundry",
    title: "Clothes Washing",
    provider: "CleanUp Pro",
    rating: 3.9,
    price: "$15/hour",
    image: "https://images.pexels.com/photos/38325/laundry-clip-clothes-clean-38325.jpeg",
  },
];

const categories = ["All", "Cleaning", "Gardening", "Repairing", "Painting", "Laundry"];

export default function AllServices() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredServices =
    selectedCategory === "All"
      ? allServices
      : allServices.filter((s) => s.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Services 🛠️</Text>

      {/* Categories Filter */}
      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.activeCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.activeCategoryText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.provider}>by {item.provider}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafe" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: { fontSize: 12, color: "#333" },
  activeCategory: { backgroundColor: "#0d47a1" },
  activeCategoryText: { color: "#fff" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10 },
  title: { fontWeight: "bold", fontSize: 14 },
  provider: { color: "#666", fontSize: 12 },
  rating: { marginTop: 4, fontSize: 12 },
  price: { fontWeight: "bold", marginTop: 4, color: "#0d47a1" },
});
