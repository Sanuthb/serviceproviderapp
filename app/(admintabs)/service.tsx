import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { addServiceToFirestore } from "../../db/adminservicedb";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvdtyofcp/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "serviceproviderapp";

const Service = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [provider, setProvider] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (imageUri: string) => {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "service.jpg"
    } as any);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: data
    });
  
    const file = await res.json();
    return file.secure_url;
  };
  

  const handleAddService = async () => {
    if (!title || !rating || !price || !discount || !provider || !imageUri) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadToCloudinary(imageUri);

      const newService = {
        title,
        rating: parseFloat(rating),
        price,
        discount,
        provider,
        image: imageUrl,
      };

      await addServiceToFirestore(newService);
      setMessage("✅ Service added successfully!");

      // Clear fields
      setTitle("");
      setRating("");
      setPrice("");
      setDiscount("");
      setProvider("");
      setImageUri("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add service.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Service</Text>

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Rating" keyboardType="numeric" value={rating} onChangeText={setRating} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Discount" value={discount} onChangeText={setDiscount} />
      <TextInput style={styles.input} placeholder="Provider" value={provider} onChangeText={setProvider} />

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.addButtonText}>Select Image</Text>
      </TouchableOpacity>

      {imageUri ? <Image source={{ uri: imageUri }} style={{}} /> : null}

      <TouchableOpacity style={styles.addButton} onPress={handleAddService} disabled={uploading}>
        <Text style={styles.addButtonText}>{uploading ? 'Uploading...' : 'Add Service'}</Text>
      </TouchableOpacity>

      <Text style={{ color: "green", textAlign: "center", marginTop: 10 }}>{message}</Text>
    </View>
  );
};

export default Service;

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
  uploadButton: {
    backgroundColor: '#1565c0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: "center",
  },
});
