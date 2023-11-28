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
  where,
} from 'firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getUser, getUserData} from './Logger';

const db = getFirestore();

export async function getBooks(rawGenre) {
  const genre = rawGenre.toString();
  const booksReference = collection(db, 'books');
  const askBooks = query(booksReference, where('book_tags', '==', genre));

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
    return undefined;
  }
}

export async function getFeedByGenres(genres) {
  try {
    const fetchedGenres = await Promise.all(
      genres.map(async genre => {
        try {
          const fetchedBooks = await getBooks(genre);
          return {
            type: genre,
            data: fetchedBooks || [],
            isEmpty: !fetchedBooks || fetchedBooks.length === 0,
          };
        } catch (error) {
          console.error(`Error fetching books for genre ${genre}: `, error);
          return {
            type: genre,
            data: [],
            isEmpty: true,
          };
        }
      }),
    );

    let emptyGenresCount = genres.length;
    for (const genre of fetchedGenres) {
      if (genre.data.length !== 0) emptyGenresCount = emptyGenresCount - 1;
    }

    return emptyGenresCount === genres.length ? undefined : fetchedGenres;
  } catch (error) {
    console.error('Error fetching books: ', error);
    return undefined;
  }
}


export async function getChapters(reference) {
  const chaptersReference = collection(db, `books/${reference}/chapters`);
  try {
    const userData = await getUserData();
      if(!userData) return undefined;
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
    return undefined;
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
        return isLiked ? true : false;
    }

    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getLibrary = async () => {
  try {
    const userData = await getUserData();
    if (userData) {
      const libraryData = userData.user_likes;
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
    return undefined;
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

export const searchBookTitle = async title => {
  try {
    const search = title.toString();
    const libraryReference = collection(db, 'books');
    const askTitledBooks = query(
      libraryReference,
      where('book_title', '>=', search),
      where('book_title', '<=', search + '\\uf8ff'),
    );
    const searchedBooks = await getDocs(askTitledBooks);
    const newSearches = searchedBooks.docs.map(book => {
      const bookData = book.data();
      return {
        id: book.id,
        ...bookData,
      };
    });
    return newSearches;
  } catch (error) {
    console.log(error);
    return false;
  }
};
