import firestore from '@react-native-firebase/firestore';
import MovieCommentModel from '../model/movie-comment.model';

const getMovieComment = (movieId: string) => {
  return firestore().collection('user_comments').orderBy('created_at', 'desc');
}

const addMovieComment = (movieComment: MovieCommentModel) => {
  return firestore().collection('user_comments').add(movieComment);
}

const likeComment = (comment_id: string, previous_like: number) => {
  return firestore().collection('user_comments')
    .doc(comment_id)
    .update({
      comment_like_count: previous_like + 1,
    })
}

export const FireStoreService = { getMovieComment, addMovieComment, likeComment };