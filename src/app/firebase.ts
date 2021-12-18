import { firebaseConfig } from './config';
import { postItem, masterItem, postData, dbPostItem, userStatus } from './types'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(firebaseApp);
const database = firebase.database(firebaseApp);
const dbRef = database.ref();
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
  const dataRef = await dbRef.child('react-editor/' + target).get();
  const data = await dataRef.val();
  return data;
}

export const updateMaster = async (target: string, data: any) => {  
  const postRef = await dbRef.child('react-editor/masters/' + target).set(data);
  const dataRef = await dbRef.child('react-editor/masters/' + target).get();
  const result = await dataRef.val();
  return {
    target: target,
    data: result
  }
}

export const updatePost = async (post: dbPostItem) => {
  const postRef = dbRef.child('react-editor/posts/' + post.target).update(post.data);
  const dataRef = await dbRef.child('react-editor/posts/' + post.target).get();
  const result = await dataRef.val();
  return result;
}


export const removePost = async (id: string) => {
  dbRef.child('react-editor/posts/' + id).remove();
  return id;
}

export const addPost = async (post: postData) => {
  const key = dbRef.child('react-editor/test/').push().key;
  const postRef = await dbRef.child('react-editor/posts/' + key).set(post);
  const dataRef = await dbRef.child('react-editor/posts/' + key).get();
  const result = await dataRef.val();
  console.log(key, result);
  return {
    id: key,
    data: result
  }
}
export const userAuth = async (user: userStatus) => {
auth.signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    const userResponse = userCredential.user;
    console.log(userResponse);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}