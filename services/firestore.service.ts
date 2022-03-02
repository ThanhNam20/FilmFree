import firestore from '@react-native-firebase/firestore';
import MovieCommentModel from '../model/movie-comment.model';

const getMovieComment = (movieId: any) =>{
  return firestore().collection('user_comments').where('film_id', '==', movieId);
}

const addMovieComment = (movieComment: MovieCommentModel) =>{
  firestore().collection('user_comments').add(movieComment);
}

export const FireStoreService = {getMovieComment, addMovieComment};