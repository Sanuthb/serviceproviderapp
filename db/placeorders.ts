import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

type OrderData = {
  service: string;
  provider: string;
  datetime: Date;
  message: string;
  contact: string;
  address: string;
  status?: "Pending" | "Confirmed" | "Completed" | "Canceled";
};

const updateOrderStatus = async (
  id: string,
  newStatus: OrderData["status"]
) => {
  try {
    const orderRef = doc(db, "orders", id);
    const docSnap = await getDoc(orderRef);

    if (!docSnap.exists()) {
      console.error("❌ No document found for order ID:", id);
      throw new Error("No order found with the given ID.");
    }

    await updateDoc(orderRef, { status: newStatus });
    console.log("✅ Order status updated to:", newStatus);
  } catch (e) {
    console.error("🔥 Failed to update status:", e);
    throw e;  // Re-throw to handle errors in calling functions
  }
};

export { updateOrderStatus };
