import { Entypo } from "@expo/vector-icons";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { mainColor } from "../../constants/config";
import { CommonService } from "../../services/common.service";
import { FireStoreService } from "../../services/firestore.service";

const CommentMovieComponent = ({ movieId }: any) => {
  const [listComments, setlistComments] = useState<any>([]);
  const [loadingComment, setLoadingComment] = useState<boolean>(true);

  useEffect(() => {
    setLoadingComment(true);
    const subscriber = FireStoreService.getMovieComment(movieId).onSnapshot(
      (documentSnapshot) => {
        const newArrayList: FirebaseFirestoreTypes.DocumentData[] = [];
        documentSnapshot.forEach((item) => {
          if (!item.data()) return;
          if (item.data().film_id === movieId) {
            const commentDataWithId = {
              ...item.data(),
              id: item.id,
            };
            newArrayList.push(commentDataWithId);
          }
        });
        setlistComments(newArrayList);
        setLoadingComment(false);
      }
    );
    return () => subscriber();
  }, []);

  const likeComment = (id: string, comment_like_count: number) => {
    FireStoreService.likeComment(id, comment_like_count).then(() => {
      console.log("Update like comment");
    });
  };

  const MovieCommentItem = ({ item }: any) => {
    return (
      <View style={style.container}>
        <Image style={style.avatar_user} source={{ uri: item.user_avatar }} />
        <View style={style.comment}>
          <Text style={style.user_name}>{item.user_name}</Text>
          <Text style={style.created_at}>
            {CommonService.convertTimestamp(item.created_at)}
          </Text>
          <Text style={style.comment_title}>{item.comment_title}</Text>
          <Pressable
            onPress={() => likeComment(item.id, item.comment_like_count)}
          >
            <View style={style.user_reaction}>
              <Entypo name="heart" size={24} color="#FF6363" />
              <Text style={style.like_number}>{item.comment_like_count}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  return (listComments && listComments.length === 0 && loadingComment === false) ? (
    <View>
      <Text style={style.no_comment_text}>
        There is no comment here, comment something for fun.
      </Text>
    </View>
  ) : (listComments && listComments.length > 0 && loadingComment === false) ? (
    <FlatList
      style={style.list_item}
      data={listComments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }: any) => <MovieCommentItem item={item} />}
    />
  ) : null;
};

export default CommentMovieComponent;

const style = StyleSheet.create({
  list_item: {
    zIndex: 0,
  },
  container: {
    backgroundColor: mainColor,
    paddingLeft: 10,
    flex: 1,
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    width: "80%",
  },
  avatar_user: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  comment: {
    marginLeft: 8,
  },
  user_name: {
    fontWeight: "700",
    color: "white",
  },
  created_at: {
    fontSize: 10,
    color: "#D1D1D1",
  },
  comment_title: {
    color: "white",
  },
  user_reaction: {
    display: "flex",
    flexDirection: "row",
  },
  like_number: {
    color: "white",
    paddingLeft: 5,
  },
  no_comment_text: {
    color: "white",
    position: "relative",
    textAlign: "center",
    top: 30,
  },
});
