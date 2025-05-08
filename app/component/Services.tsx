import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "expo-router";

interface ServiceProps {
  limit: number;
}

const Services = ({ limit }: ServiceProps) => {
  const [services, setServices] = useState<
    Array<{
      id: string;
      title: string;
      rating: number;
      price: string;
      discount: string;
      provider: string;
      image: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      const fetchedServices = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as {
          title: string;
          rating: number;
          price: string;
          discount: string;
          provider: string;
          image: string;
        }),
      }));
      setServices(fetchedServices);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Limit the number of services displayed based on the `limit` prop
  const servicesToDisplay = limit === 0 ? services : services.slice(0, limit);

  return (
    <ScrollView>
      {servicesToDisplay.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
              {item.discount && (
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>{item.discount}% OFF</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.provider}>by {item.provider}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}> ₹{item.price}/Hour</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() =>
                  router.push({
                    pathname: "/detailedview",
                    params: { service: JSON.stringify(item) },
                  })
                }
              >
                <Text style={styles.bookText}>BOOK SERVICE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Services;

const styles = StyleSheet.create({
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
