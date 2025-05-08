import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { logout } from "../../redux/Slice/userSlice";
import { useRouter } from "expo-router";

const adminprofile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login"); // navigate to login or home screen
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#FFD63A",
          width: "100%",
          height: "40%",
          position: "relative",
        }}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/smiling-young-man-glasses_1308-174702.jpg?t=st=1746075909~exp=1746079509~hmac=3f4250496487c8b6785b64288738ba8f96f35a56017dc9936fe1d2fe553b01e2&w=740",
          }}
          style={styles.image}
        />
      </View>
      <View style={{flex:1,alignItems:"center",justifyContent:"center",padding:20}}>
        <View style={styles.card}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user.displayName || "Guest"}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email || "Not logged in"}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default adminprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "40%",
    height: "50%",
    borderRadius: 100,
    position: "absolute",
    bottom: -40,
    left: 120,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#0d47a1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
