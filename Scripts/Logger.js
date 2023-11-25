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
    if (userCredential === null) {
      return;
    }
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
};

export async function getUser() {
  try {
    const userCredential = await EncryptedStorage.getItem('userCredential');
    const userData = JSON.parse(userCredential);
    const userIdentification = userData.user.uid;
    return userIdentification;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getUserHistory = async () => {
  try {
    const userData = await getUserData();
    const userHistory = userData.user_history;
    const newEntries = Promise.all(
      userHistory
        .slice(0, 5)
        .reverse()
        .map(async entry => {
          const entryParentId = entry._key.path.segments[6];
          const entryReference = doc(db, entry.path);
          const entryParentReference = doc(db, 'books', entryParentId);
          const entryParent = await getDoc(entryParentReference);
          const entryParentName = entryParent.data().book_title;
          const entryDoc = await getDoc(entryReference);
          return {
            id: entryDoc.id,
            chapter_parent_data: entryParent.data(),
            chapter_parent_name: entryParentName,
            ...entryDoc.data(),
          };
        }),
    );
    return newEntries;
  } catch (error) {
    alert(error);
  }
};

export const wipeUserHistory = async () => {
  try {
    const userId = await getUser();
    const userReference = doc(db, 'users', userId);
    const wipedHistory = await updateDoc(userReference, {
      user_history: [],
    });
    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
};

export const postUserBiography = async input => {
    const text = input.toString();
    try {
        const userId = await getUser();
        const userReference = doc(db, 'users', userId);
        const uploadedBio = await updateDoc(userReference, {
            user_biography: text,
        });
        return true;
    } catch (error) {
        return false;
        console.log(error);
    }
};

export const changeUserName = async input => {
    const text = input.toString();
    try {
        const userId = await getUser();
        const userReference = doc(db, 'users', userId);
        const uploadedName = await updateDoc(userReference, {
            user_name: text,
        });
        return true;
    } catch (error) {
        return false;
        console.log(error);
    }
};
