import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { updateOrderStatus } from '../../db/placeorders';

type Order = {
  id: string;
  service: string;
  provider: string;
  datetime: any;
  message: string;
  contact: string;
  address: string;
  status: "Pending" | "Confirmed" | "Completed" | "Canceled";
};

const AdminBookings = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    const ordersData: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ordersData.push({
        id: doc.id,
        ...data,
      } as Order);
    });
    setOrders(ordersData);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: Order['status']) => {
    console.log(`Updating order ${id} to status: ${newStatus}`);
    try {
      await updateOrderStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
      );
      Alert.alert("Success", `Order ${id} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update order status:", error);
      Alert.alert("Error", "Failed to update order status. Please try again later.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#000" />;

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.details}>
            <Text>Provider: {item.provider}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Message: {item.message}</Text>
            <Text>Date: {new Date(item.datetime.seconds * 1000).toLocaleString()}</Text>

            <Picker
              selectedValue={item.status}
              style={styles.picker}
              onValueChange={(value) => {handleStatusChange(item.id, value)}}
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Confirmed" value="Confirmed" />
              <Picker.Item label="Completed" value="Completed" />
              <Picker.Item label="Canceled" value="Canceled" />
            </Picker>
          </View>
        </View>
      )}
    />
  );
};

export default AdminBookings;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  service: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  picker: {
    height: 70,
    width: 180,
    marginTop: 10,
  },
});
