import {
  getFirestore,
  getDocs,
  getDoc,
  addDoc,
  doc,
  collection,
  query,
} from 'firebase/firestore';
import {getUser} from '../Scripts/Booker';
const db = getFirestore();

const getChapterReference = parent => {
  const chapter = JSON.parse(parent);
  const chapterParentId = chapter.chapter_parent._key.path.segments[6]; // gets chapter parent id

  const chapterReference = doc(
    db,
    'books',
    chapterParentId,
    'chapters',
    chapter.id,
  );
  return chapterReference;
};

export const sendComment = async (comment, parent) => {
  try {
    const reference = getChapterReference(parent);
    const user = await getUser();
    const commentSent = await addDoc(collection(reference, 'comments'), {
      comment_poster: user,
      comment_message: comment,
      comment_release: new Date(),
      comment_chapter: reference,
      comment_reply: null,
      comment_likes: 0,
    });

    return commentSent ? true : false;
  } catch (error) {
    alert(error);
  }
};

export const getComments = async parent => {
  const reference = getChapterReference(parent);
  const askComments = query(collection(reference, 'comments'));

  try {
    const receivedComments = await getDocs(askComments);
    const newComments = await Promise.all(
      receivedComments.docs.map(async comment => {
        const commentData = comment.data();
        const commentPosterId = commentData.comment_poster;
        const commentPosterReference = doc(db, 'users', commentPosterId);
        const commentPoster = await getDoc(commentPosterReference);
        const commentPosterName = commentPoster.data().user_name;
        const commentPosterPicture = commentPoster.data().user_picture;

        return {
          comment_poster_name: commentPosterName,
          comment_poster_picture: commentPosterPicture,
          ...commentData,
          comment_release: commentData.comment_release.toDate().toLocaleString(),
        };
      }),
    );

    return newComments;
  } catch (error) {
    alert(error);
  }
};
