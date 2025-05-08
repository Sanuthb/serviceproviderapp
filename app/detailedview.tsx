import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, ScrollView } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useLocalSearchParams, useRouter } from "expo-router";

const DetailedView = () => {
  const { service } = useLocalSearchParams();
  const parsedService = JSON.parse(service as string);
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");  // Contact details
  const [address, setAddress] = useState("");  // Address details
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (_event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setShowTimePicker(true); // show time after date selected
    }
  };

  const handleTimeChange = (_event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) setSelectedTime(time);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !contact || !address) {
      alert("Please fill in all details (Date, Time, Contact, Address)");
      return;
    }
  
    const dateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );
  
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        service: parsedService.title,
        provider: parsedService.provider,
        image: parsedService.image,
        rating: parsedService.rating,
        price: parsedService.price,
        discount: parsedService.discount || 0,
        message,
        contact,
        address,
        datetime: dateTime,
        createdAt: new Date(),
        status: "Pending",
      });
      console.log("Document written with ID: ", docRef.id);  // This logs the generated ID
      alert("Booking successful!");
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: parsedService.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{parsedService.title}</Text>
        <Text style={styles.provider}>by {parsedService.provider}</Text>

        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {parsedService.rating}</Text>
          {parsedService.discount && (
            <Text style={styles.discount}>{parsedService.discount}% OFF</Text>
          )}
        </View>

        <Text style={styles.price}>₹{parsedService.price}/Hour</Text>

        <Text style={styles.description}>
          Enjoy professional {parsedService.title.toLowerCase()} services at your doorstep.
          High-quality and trusted service providers for all your needs.
        </Text>

        <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.bookButtonText}>Book Slot</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for date, time, and message */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book {parsedService.title}</Text>

            <Button title="Pick Date and Time" color="#0d47a1" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={selectedDate || new Date()}
                onChange={handleDateChange}
                display="default"
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={selectedTime || new Date()}
                onChange={handleTimeChange}
                display="default"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Enter your message"
              value={message}
              onChangeText={setMessage}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your contact details"
              value={contact}
              onChangeText={setContact}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />

            <View style={styles.buttonGroup}>
              <Button title="Confirm Booking" color="#0d47a1" onPress={handleBooking} />
              <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DetailedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  image: {
    width: "100%",
    height: 240,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginTop: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  provider: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    backgroundColor: "#fff4e0",
    color: "#ff9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 13,
  },
  discount: {
    backgroundColor: "#e0f7e9",
    color: "#2e7d32",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: "600",
    fontSize: 13,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: "#0d47a1",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // transparent overlay for background blur
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
