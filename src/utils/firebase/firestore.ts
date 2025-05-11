import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { mergeBoxesByPlace } from "../boxes";

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
