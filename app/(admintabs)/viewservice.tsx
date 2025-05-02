import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
 import {db} from "../../firebase" 
  
  const ViewService = () => {
    const [services, setServices] = useState<Array<{
      id: string;
      title: string;
      rating: number;
      price: string;
      discount: string;
      provider: string;
      image: string;
    }>>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
  
    const [editFields, setEditFields] = useState({
      title: '',
      rating: '',
      price: '',
      discount: '',
      provider: '',
      image: '',
    });
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
        const fetchedServices = snapshot.docs.map(doc => ({
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
  
    const handleDelete = async (id: string) => {
      Alert.alert("Delete Service", "Are you sure you want to delete this service?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteDoc(doc(db, "services", id));
          },
          style: "destructive",
        }
      ]);
    };
  
    const handleEditPress = (service: any) => {
      setSelectedService(service);
      setEditFields({
        title: service.title,
        rating: service.rating.toString(),
        price: service.price,
        discount: service.discount,
        provider: service.provider,
        image: service.image,
      });
      setModalVisible(true);
    };
  
    const handleSaveEdit = async () => {
      if (!selectedService) return;
      await updateDoc(doc(db, 'services', selectedService.id), {
        ...editFields,
        rating: parseFloat(editFields.rating),
      });
      setModalVisible(false);
    };
  
    if (loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0d47a1" />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>All Services</Text>
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: `${item.image}` }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Discount: {item.discount}</Text>
                <Text>Provider: {item.provider}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEditPress(item)} style={styles.editBtn}>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
  
        {/* Edit Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Service</Text>
              {['title', 'rating', 'price', 'discount', 'provider', 'image'].map((field) => (
                <TextInput
                  key={field}
                  placeholder={field}
                  style={styles.input}
                  value={editFields[field as keyof typeof editFields]}
                  onChangeText={(text) => setEditFields({ ...editFields, [field]: text })}
                />
              ))}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={handleSaveEdit} style={styles.modalBtn}>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBtnCancel}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default ViewService;
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f8fbff' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    card: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 10,
      elevation: 3,
    },
    image: { width: 80, height: 80, borderRadius: 10 },
    info: { marginLeft: 12, flex: 1 },
    title: { fontWeight: 'bold', fontSize: 16 },
    actions: { flexDirection: 'row', marginTop: 10 },
    editBtn: {
      backgroundColor: '#1976d2',
      padding: 6,
      borderRadius: 6,
      marginRight: 10,
    },
    deleteBtn: {
      backgroundColor: '#d32f2f',
      padding: 6,
      borderRadius: 6,
    },
    btnText: { color: '#fff', fontWeight: '600' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContainer: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '85%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginBottom: 10,
      paddingHorizontal: 10,
      height: 45,
    },
    modalBtn: {
      backgroundColor: '#1976d2',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: 10,
    },
    modalBtnCancel: {
      backgroundColor: '#888',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: 10,
    },
  });
  