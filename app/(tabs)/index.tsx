import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {RootState} from "../../redux/Store"
import { useSelector } from "react-redux";

const services = [
  {
    title: "Home Cleaning",
    rating: 4.5,
    price: "$24/Hour",
    discount: "25% OFF",
    provider: "Hema Watson",
    image: "https://images.pexels.com/photos/4239034/pexels-photo-4239034.jpeg",
  },
  {
    title: "Gardening",
    rating: 3.5,
    price: "$18/Hour",
    provider: "Saloni Sam",
    image: "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg",
  },
];

// Category definitions with icons
const categories = [
  { name: "Cleaning",image:require("../../assets/images/cleaning.png") },
  { name: "Painting", image:require("../../assets/images/paint.png") },
  { name: "Repairing",image:require("../../assets/images/repairing.png") },
  { name: "Laundry",image:require("../../assets/images/washing.png") },
];


export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user);
  console.log(user)
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
        <Text style={styles.hello}>Hello {user.displayName || 'Maria'},</Text>
          <Text style={styles.title}>Which service do you need?</Text>
        </View>
        <Image
          source={{ uri: "https://img.freepik.com/free-vector/smiling-young-man-glasses_1308-174702.jpg?t=st=1746075909~exp=1746079509~hmac=3f4250496487c8b6785b64288738ba8f96f35a56017dc9936fe1d2fe553b01e2&w=740" }}
          style={styles.avatar}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput placeholder="How can I help you?" style={styles.input} />
        <TouchableOpacity>
          <Ionicons name="mic" size={24} color="#4e8ef7" style={styles.micIcon} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {categories.map((cat, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <Image
                source={cat.image}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.categoryText}>{cat.name}</Text>
          </View>
        ))}
      </View>

      {/* Popular Services */}
      <Text style={styles.popularTitle}>Popular Services ✨</Text>

      {services.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
              {item.discount && (
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.provider}>by {item.provider}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookText}>BOOK SERVICE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f8fbff", padding: 20, flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: { color: "#f89d28", fontSize: 14 },
  title: { fontSize: 20, fontWeight: "bold", color: "#111" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  searchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  input: { flex: 1, marginLeft: 10 },
  micIcon: {
    backgroundColor: "#FFD63A",
    padding: 6,
    borderRadius: 20,
    overflow: "hidden",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  categoryItem: { alignItems: "center" },
  categoryIcon: {
    backgroundColor: "#dce9fd",
    padding: 15,
    borderRadius: 15,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: { fontSize: 12, color: "#333" },
  popularTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    padding: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  cardImage: { width: 80, height: 80, borderRadius: 12 },
  cardContent: { flex: 1, marginLeft: 10 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: { fontWeight: "bold", color: "#333" },
  discountTag: {
    backgroundColor: "#e0f0ff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: { fontSize: 10, color: "#4e8ef7" },
  cardTitle: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
  provider: { fontSize: 12, color: "#666" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  price: { fontWeight: "bold", color: "#4e8ef7" },
  bookButton: {
    backgroundColor: "#0d47a1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  bookText: { color: "#fff", fontSize: 12 },
});
