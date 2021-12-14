import { firebaseConfig } from './config';
import { postData, masterItem } from '../features/types'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(firebaseApp);
const database = firebase.database(firebaseApp);
const storage = firebase.storage(firebaseApp);
const storageRef = storage.ref();

export const uploadFile = async (file: File) => {
  const metadata = {
    contentType: 'image/*'
  };
  const fileRef = storageRef.child('images/' + file.name);
  const uploadTask = await fileRef.put(file, metadata);
  const downloadURL = await uploadTask.ref.getDownloadURL();
  return {
    success: 1,
    file: {
      url: downloadURL
    }
  }
}

export const downloadFile = async (fileName: string) => {
  const fileRef = storageRef.child('images/' + fileName);
  const fileURL = await fileRef.getDownloadURL();
  return fileURL;
}

export const fetchData = async (target: string) => {
  const dbRef = database.ref();
  const dataRef = await dbRef.child('react-editor/' + target).get();
  const data = await dataRef.val();
  return data;
}

// const createDB = (path: string, data: masterItem) => {
//   database.ref(path + data.id).set({
//     id: data.id,
//     name: data.name
//   });
// }

// const readDB = (path: string, id?: number) => {
//   database.ref(path + id).on('value', (snapshot) => {
//     const data = snapshot.val();

//   })
// }

// const updateDB = (path: string, data: masterItem) => {
//   database.ref(path + data.id).update({
//     id: data.id,
//     name: data.name
//   });
// }

// const deleteDB = (path: string, id: number) => {
//   database.ref(path + id).remove();
// }