export default interface MovieCommentModel {
  comment_dislike_count: number;
  comment_like_count: number;
  comment_title: string;
  created_at: Date;
  film_id: number;
  user_avatar: string;
  user_name: string;
} 