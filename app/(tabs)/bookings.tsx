import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming this file contains the Firebase setup

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  // Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const bookingData: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Safely convert Firestore Timestamp to JavaScript Date
          const datetime = data.datetime ? data.datetime.toDate() : null; 
          const createdAt = data.createdAt ? data.createdAt.toDate() : null;
          
          bookingData.push({
            id: doc.id,
            ...data,
            datetime: datetime,
            createdAt: createdAt,
          });
        });
        setBookings(bookingData); // Set the state with the fetched bookings
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchBookings();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings 📅</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Safely handle case when datetime is null or undefined
          const formattedDate = item.datetime
            ? item.datetime.toLocaleDateString() // Format if it's a valid Date object
            : "No Date Available";
          const formattedTime = item.datetime
            ? item.datetime.toLocaleTimeString() // Format if it's a valid Date object
            : "No Time Available";

          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.serviceTitle}>{item.service}</Text>
                <Text style={styles.provider}>by {item.provider}</Text>
                <Text style={styles.provider}>Price: ₹{item.price}/Hour</Text>
                <Text style={styles.provider}>Message: {item.message}</Text>
                <Text style={styles.provider}>Contact: {item.contact}</Text>
                <Text style={styles.time}>
                  Date: {formattedDate} | Time: {formattedTime}
                </Text>
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
          );
        }}
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
