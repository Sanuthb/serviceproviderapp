import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Contact = () => {
  const handleCall = () => Linking.openURL("tel:+923070962525");
  const handleEmail = () => Linking.openURL("mailto:contact@virtualskill.services");

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>If you have any question we are happy to help</Text>

      {/* Phone Section */}
      <TouchableOpacity style={styles.contactBox} onPress={handleCall}>
        <Ionicons name="call" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.contactText}>+92 307 096 25</Text>

      {/* Email Section */}
      <TouchableOpacity style={styles.contactBox} onPress={handleEmail}>
        <Ionicons name="mail" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.contactText}>contact@virtualskill.services</Text>

      {/* Social Icons */}
      <Text style={styles.connectText}>Get Connected</Text>
      <View style={styles.socialRow}>
        <FontAwesome name="linkedin" size={24} style={styles.icon} />
        <FontAwesome name="facebook" size={24} style={styles.icon} />
        <FontAwesome name="twitter" size={24} style={styles.icon} />
        <FontAwesome name="instagram" size={24} style={styles.icon} />
        <FontAwesome name="envelope" size={24} style={styles.icon} />
      </View>

      {/* Store Links (Placeholder) */}
      <View style={styles.storeRow}>
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_(black)_SVG.svg" }} style={styles.storeImage} />
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" }} style={styles.storeImage} />
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent:"center",
    gap:10,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  contactBox: {
    backgroundColor: "#FFD63A",
    padding: 16,
    borderRadius: 50,
    marginVertical: 10,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 10,
  },
  connectText: {
    marginTop: 30,
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 10,
  },
  icon: {
    color: "#555",
  },
  storeRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    width: "100%",
  },
  storeImage: {
    width: 140,
    height: 45,
    resizeMode: "contain",
  },
});
