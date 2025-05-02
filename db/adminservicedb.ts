import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// Add Service to Firestore
const addServiceToFirestore = async (service: {
  title: string;
  rating: number;
  price: string;
  discount: string;
  provider: string;
  image: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "services"), {
      title: service.title,
      rating: service.rating,
      price: service.price,
      discount: service.discount,
      provider: service.provider,
      image: service.image,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { addServiceToFirestore };
