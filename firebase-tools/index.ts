import hotel from "./data/hotel.json";
import activity from "./data/activity.json";
import discount from "./data/discount.json";
import food from "./data/food.json";
import destination from "./data/destination.json";

import {
    getFirestore,
    Firestore,
    collection,
    addDoc,
    getDocs,
    CollectionReference,
    QuerySnapshot,
    QueryDocumentSnapshot
} from "firebase/firestore";
import app from "./config";

const db: Firestore = getFirestore(app)
const collections = {
    "hotel": hotel,
    "activity": activity,
    "discount": discount,
    "food": food,
    "destination": destination,
}

const collectionName = "food";

// 1. add multiple data
collections[collectionName].forEach(async (value) => {
    const collectionRef: CollectionReference = collection(db, collectionName)
    await addDoc(collectionRef, value)
    console.log("added 1 document")
})

// 2. find document id matching a condition
collections[collectionName].forEach(async (value) => {
    const collectionRef: CollectionReference = collection(db, collectionName)
    const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
    let ids = []
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        if (doc.data().imageUrl.includes("/Sapa")) {
            ids.push(doc.id)
        }
    });
    console.log(ids)
})