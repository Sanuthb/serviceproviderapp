import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const AdminUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData: User[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name || "Unnamed",
          email: data.email || "No email",
          role: data.role || "user",
        };
      });
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "users", id));
              setUsers((prev) => prev.filter((user) => user.id !== id));
              Alert.alert("Deleted", "User has been deleted.");
            } catch (error) {
              console.error("Error deleting user:", error);
              Alert.alert("Error", "Failed to delete user.");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchUsers();
  });

  if (loading)
    return (
      <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#000" />
    );

  return (
    <>
      {users? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Role: {item.role}</Text>
              <Button
                title="Delete User"
                color="#d11a2a"
                onPress={() => deleteUser(item.id)}
              />
            </View>
          )}
        />
      ):<View style={styles.card}>No users </View>}
    </>
  );
};

export default AdminUserList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
