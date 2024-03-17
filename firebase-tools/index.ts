import hotel from "./data/hotel.json";
import activity from "./data/activity.json";
import discount from "./data/discount.json";
import food from "./data/food.json";
import destination from "./data/destination.json";

import {
    getFirestore,
    Firestore,
    collection,
    doc,
    CollectionReference,
    QuerySnapshot,
    QueryDocumentSnapshot,
    updateDoc,
    deleteField,
    addDoc,
    getDocs,
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

const collectionName = "activity";
const collectionRef: CollectionReference = collection(db, collectionName)

// 1. add multiple data
// collections[collectionName].forEach(async (value) => {
//     await addDoc(collectionRef, value)
//     console.log("added 1 document")
// })

// 2. find document id matching a condition
// const findDocumentId = async () => {
//     const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
//     let ids = []
//     querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
//         if (doc.data().imageUrl.includes("/Sapa")) {
//             ids.push(doc.id)
//         }
//     });
//     console.log(ids)
// }
// findDocumentId();

// 3. update a document
const updateDocumentFieldName = async () => {
    const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(async (documentSnapshot: QueryDocumentSnapshot) => {
        const documentRef = doc(db, collectionName, documentSnapshot.id)
        await updateDoc(documentRef, {
            businessTime: documentSnapshot.data().startTimes,
            startTimes: deleteField(),
        })
    });
}
updateDocumentFieldName()