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
  orderBy,
} from 'firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getUser, getUserData} from './Logger';

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
    const userData = await getUserData();
    const snapshot = await getDocs(
      query(chaptersReference, orderBy('chapter_order', 'desc')),
    );
    const newChapters = Promise.all(
      snapshot.docs.map(async chapter => {
        const chapterPosterId = chapter.data().chapter_poster;
        const chapterPosterReference = doc(db, 'users', chapterPosterId);
        const chapterPoster = await getDoc(chapterPosterReference);
        const poster = chapterPoster.exists()
          ? chapterPoster.data().user_name
          : 'Scanlation';

        const userHistory = JSON.stringify(userData.user_history);
        const alreadyViewed = userHistory.includes(chapter.id);

        return {
          id: chapter.id,
          chapter_poster_name: poster,
          viewed: alreadyViewed,
          ...chapter.data(),
        };
      }),
    );

    return newChapters;
  } catch (error) {
    console.error('Error fetching chapters: ', error);
    return [];
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
    const bookReference = doc(db, `books/${reference}`);
    const userDoc = await getUserData();

    if (userDoc) {
      const userLikes = userDoc.user_likes;
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
    const userData = await getUserData();
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

export const rememberChapter = async loadedChapter => {
  try {
    const userId = await getUser();
    const chapter = JSON.parse(loadedChapter);
    const chapterParentId = chapter.chapter_parent._key.path.segments[6];
    const chapterReference = doc(
      db,
      'books',
      chapterParentId,
      'chapters',
      chapter.id,
    );
    const userReference = doc(db, 'users', userId);

    await updateDoc(userReference, {
      user_history: arrayUnion(chapterReference),
    });

    return true;
  } catch (error) {
    alert(error);
    console.error('Error remembering chapter:', error);
    return false;
  }
};

export const forgetChapter = async loadedChapter => {
  try {
    const userId = await getUser();
    const userReference = doc(db, 'users', userId);
    const chapter = JSON.parse(loadedChapter);
    const chapterParentId = chapter.chapter_parent._key.path.segments[6];
    const chapterReference = doc(
      db,
      'books',
      chapterParentId,
      'chapters',
      chapter.id,
    );
    await updateDoc(userReference, {
      user_history: arrayRemove(chapterReference),
    });

    return true;
  } catch (error) {
    alert(error);
    console.error('Error remembering chapter:', error);
    return false;
  }
};


