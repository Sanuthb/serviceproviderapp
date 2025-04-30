import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

// Dummy booked services data (ideally fetched from backend or context)
const bookings = [
  {
    id: "1",
    title: "Home Cleaning",
    provider: "Hema Watson",
    image: "https://images.pexels.com/photos/4239034/pexels-photo-4239034.jpeg",
    time: "April 30, 2025 - 10:00 AM",
    status: "Confirmed",
  },
  {
    id: "2",
    title: "Gardening",
    provider: "Saloni Sam",
    image: "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg",
    time: "May 2, 2025 - 3:00 PM",
    status: "Pending",
  },
];

export default function Bookings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings 📅</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.provider}>by {item.provider}</Text>
              <Text style={styles.time}>{item.time}</Text>
              <Text
                style={[
                  styles.status,
                  { color: item.status === "Confirmed" ? "green" : "orange" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafe",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  provider: {
    fontSize: 13,
    color: "#666",
    marginVertical: 2,
  },
  time: {
    fontSize: 12,
    color: "#444",
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});
