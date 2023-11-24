import {Alert} from 'react-native';
import {
  getDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  ref,
} from 'firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage';

const db = getFirestore();

export async function getBooks() {
  const booksReference = collection(db, 'books');
  const askBooks = query(booksReference);

  try {
    const snapshot = await getDocs(askBooks);
    const newBooks = snapshot.docs.map(doc => {
      const bookData = doc.data();
      return {
        id: doc.id,
        ...bookData,
      };
    });
    return newBooks;
  } catch (error) {
    console.error('Error fetching books: ', error);
    return [];
  }
}

export async function getChapters(reference) {
  const chaptersReference = collection(db, `books/${reference}/chapters`);
  try {
    const snapshot = await getDocs(query(chaptersReference));
    const newChapters = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

    return newChapters;
  } catch (error) {
    console.error('Error fetching chapters: ', error);
    return [];
  }
}

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

export const likeBook = async reference => {
  try {
    const userId = await getUser();
    if (userId === false) {
      return;
    }
    const bookReference = doc(db, `books/${reference}`);
    const userReference = doc(db, `users/${userId}`);
    const bookAddition = await updateDoc(userReference, {
      user_likes: arrayUnion(bookReference),
    });
    return bookAddition ? true : false;
  } catch (error) {
    console.log(error);
  }
};

export const dislikeBook = async reference => {
  try {
    const userId = await getUser();
    if (userId === false) {
      return;
    }
    const bookReference = doc(db, `books/${reference}`);
    const userReference = doc(db, `users/${userId}`);
    const bookRemoval = await updateDoc(userReference, {
      user_likes: arrayRemove(bookReference),
    });
    return bookRemoval ? true : false;
  } catch (error) {
    console.log(error);
  }
};

export const getLike = async reference => {
  try {
    const userId = await getUser();
    if (!userId) {
      return false;
    }

    const bookReference = doc(db, `books/${reference}`);
    const userReference = doc(db, `users/${userId}`);
    const userDoc = await getDoc(userReference);

    if (userDoc.exists()) {
      const userLikes = userDoc.data().user_likes;
      const userLikesString = JSON.stringify(userLikes);
      const isLiked = userLikesString.includes(reference);
      if (isLiked) {
        return true;
      }
    } else {
      console.log('User document not found');
      return false;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLibrary = async () => {
  try {
    const userId = await getUser();
    if (!userId) {
      return false;
    }

    const userReference = doc(db, `users/${userId}`);
    const userData = await getDoc(userReference);
    if (userData.exists()) {
      const libraryData = userData.data().user_likes;
      const fetchedLikes = await Promise.all(
        libraryData.map(async like => {
          const likeReference = doc(db, like.path);
          const likeRequest = await getDoc(likeReference);
          return {
            id: likeRequest.id,
            ...likeRequest.data(),
          };
        }),
      );
      return fetchedLikes;
    }
  } catch (error) {
    console.log(error);
  }
};
