import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export const storeEmotion = async ({
  color,
  emotions,
  request,
  time,
  user,
}: {
  color: string;
  emotions: string[];
  request: string;
  time: Date;
  user: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "user-emotions"), {
      color,
      emotions,
      request,
      time,
      user,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getEmotions = async () => {
  const emotions = [];
  const querySnapshot = await getDocs(collection(db, "user-emotions"));
  querySnapshot.forEach((doc) => {
    emotions.push(doc.data());
  });
  return emotions;
};
