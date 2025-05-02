import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {addServiceToFirestore} from "../../db/adminservicedb"
const service = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [provider, setProvider] = useState('');
  const [image, setImage] = useState('');
  const [message, setmessage] = useState('');
  const handleAddService = async () => {
    if (!title || !rating || !price || !discount || !provider || !image) {
      setmessage("Please fill in all fields.");
      return;
    }
  
    const newService = {
      title,
      rating: parseFloat(rating),
      price,
      discount,
      provider,
      image,
    };
  
    try {
      await addServiceToFirestore(newService);
      setmessage("✅ Service added successfully!");
      // Clear fields
      setTitle("");
      setRating("");
      setPrice("");
      setDiscount("");
      setProvider("");
      setImage("");
    } catch (error) {
      console.error(error);
      setmessage("❌ Failed to add service.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Service</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Discount"
        value={discount}
        onChangeText={setDiscount}
      />
      <TextInput
        style={styles.input}
        placeholder="Provider"
        value={provider}
        onChangeText={setProvider}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddService}
      >
        <Text style={styles.addButtonText}>Add Service</Text>
      </TouchableOpacity>
      <Text style={{color:"green",fontSize:1,textAlign:"center",marginTop:10}}>{message}</Text>
    </View>
  );
};

export default service;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fbff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#0d47a1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign:"center",
  },
});
