import {
  signInWithEmailAndPassword,
  setPersistence,
  signInWithCredential,
  inMemoryPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {Alert} from 'react-native';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../Scripts/firebaseConfig';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  setDoc,
  getFirestore,
    getDoc,
} from 'firebase/firestore';

const auth = FIREBASE_AUTH;
const db = FIRESTORE_DB;

export const logUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await EncryptedStorage.setItem(
      'userCredential',
      JSON.stringify(userCredential),
    );
    setPersistence(auth, inMemoryPersistence);
    return true;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const checkLogin = async () => {
  try {
    const userCredential = await EncryptedStorage.getItem('userCredential');
    if (userCredential !== null) {
      signInWithCredential(auth, userCredential);
      return true;
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const registerUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (userCredential) {
      const user = userCredential.user;
      updateProfile(user, {displayName: username});
      const stored = await storageUser(user.uid, username);
      if (stored) {
        return true;
      }
    }
  } catch (error) {
    console.log(error.message);
    Alert.alert(error.message);
  }
};

const storageUser = async (userId, username) => {
  const db = getFirestore();
  try {
    await setDoc(doc(collection(db, 'users'), userId), {
      user_name: username,
      user_likes: {},
      user_karma: 0,
      user_status: '',
      user_history: {},
      user_picture:
        'https://firebasestorage.googleapis.com/v0/b/freehua-db.appspot.com/o/cabalo.jpg?alt=media&token=b2cb42c7-5270-4c16-b44d-779ac4b5277e',
    });
    return true;
  } catch (error) {
    console.error('Erro ao armazenar o usuário no Firestore:', error);
    return false;
  }
};

export const getUserData = async () => {
    try {
        const userCredential = await EncryptedStorage.getItem('userCredential');
        if (userCredential === null){ return; }
        const userEntries = JSON.parse(userCredential);
        const userReference = doc(db, `users/${userEntries.user.uid}`);
        const fetchedUser = await getDoc(userReference);
        if (fetchedUser) {
            return fetchedUser.data();
        }
        return;
    } catch (error) {
        console.log(error);
    }
}
