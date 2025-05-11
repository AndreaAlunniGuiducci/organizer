import { addDoc, collection, getDocs } from "firebase/firestore";
import { mergeBoxesByPlace } from "../boxes";
import { db } from "./firebase";

export const addplace = async (uid: string, place: Place) => {
  try {
    await addDoc(collection(db, uid), place);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getBoxes = async (uid: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, uid));
    const data = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    const mergedBoxes = mergeBoxesByPlace(data as Place[]);
    return mergedBoxes;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};
