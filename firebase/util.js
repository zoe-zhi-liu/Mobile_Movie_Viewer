import {db} from './setup.js';
import { collection, addDoc, deleteDoc, getDoc, updateDoc, doc ,setDoc } from "firebase/firestore";

async function add(colname,item){
    try{
        const docRef = await addDoc(collection(db, colname), item);
        console.log("Document written with ID: ", docRef.id);
    }catch(e){
        console.log(e);
    }
}

async function get(colname, id) {
    try {
        const docRef = await getDoc(doc(db, colname, id));
        if (docRef.exists()) {
            return docRef.data();
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
}



async function remove(colname,id){
    try{
        const docRef=await deleteDoc(doc(db,colname,id))
    }
    catch(e){
        console.log(e)
    }
}

async function update(colname, id, data) {
    try {
        await updateDoc(doc(db, colname, id), data);
    }
    catch (e) {
        console.log(e);
    }
}

async function set(colname,item){
    try{
        const docRef=await setDoc(doc(db,colname,item.id),item,{merge:true})
    }
    catch(e){
        console.log(e)
    }
}

export {add, remove, update, get,set}