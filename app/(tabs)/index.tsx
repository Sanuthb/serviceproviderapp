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
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import Services from "../component/Services";
import { useRouter } from "expo-router";

// Category definitions with icons
const categories = [
  { name: "Cleaning", image: require("../../assets/images/cleaning.png") },
  { name: "Painting", image: require("../../assets/images/paint.png") },
  { name: "Repairing", image: require("../../assets/images/repairing.png") },
  { name: "Laundry", image: require("../../assets/images/washing.png") },
];

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello {user.displayName || "Maria"},</Text>
          <Text style={styles.title}>Which service do you need?</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.replace("/userprofile");
          }}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/smiling-young-man-glasses_1308-174702.jpg?t=st=1746075909~exp=1746079509~hmac=3f4250496487c8b6785b64288738ba8f96f35a56017dc9936fe1d2fe553b01e2&w=740",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput placeholder="How can I help you?" style={styles.input} />
        <TouchableOpacity>
          <Ionicons
            name="mic"
            size={24}
            color="#4e8ef7"
            style={styles.micIcon}
          />
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
      <Services limit={3} />
      <View style={{ position: "relative" }}>
        <Image
          source={require("../../assets/images/paintingbanner.jpg")}
          style={{ width: "100%", height: 200, borderRadius: 20 }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.1)",
            width: "100%",
            height: "100%",
            borderRadius: 20,
            flex: 1,
            justifyContent: "center",
            paddingLeft: 10,
            gap: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
              Wall Painting
            </Text>
            <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
              Service
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 4,
              paddingVertical: 4,
              alignSelf: "flex-start",
              width: 60,
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 10, fontWeight: "bold" }}
              onPress={() => {
                router.replace("/services");
              }}
            >
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  popularTitle: { fontWeight: "bold", fontSize: 20, marginBottom: 10 },
});
