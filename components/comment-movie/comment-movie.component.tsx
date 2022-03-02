import { Entypo } from "@expo/vector-icons";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image, StyleSheet, Text, View
} from "react-native";
import { mainColor } from "../../constants/config";
import { CommonService } from "../../services/common.service";
import { FireStoreService } from "../../services/firestore.service";

const CommentMovieComponent = ({ movieId }: any) => {
  const [listComments, setlistComments] = useState<any>([]);

  useEffect(() => {
    const subscriber = FireStoreService.getMovieComment(movieId).onSnapshot(
      (documentSnapshot) => {
        const newArrayList: FirebaseFirestoreTypes.DocumentData[] = [];
        documentSnapshot.forEach((item) => {
          if (!item.data()) return;
          newArrayList.push(item.data());
        });
        setlistComments(newArrayList);
      }
    );
    return () => subscriber();
  }, []);

  const MovieCommentItem = ({ item }: any) => {
    return (
      <View style={style.container}>
        <Image style={style.avatar_user} source={{ uri: item.user_avatar }} />
        <View style={style.comment}>
          <Text style={style.user_name}>{item.user_name}</Text>
          <Text style={style.created_at}>{CommonService.convertTimestamp(item.created_at)}</Text>
          <Text style={style.comment_title}>{item.comment_title}</Text>
          <View style={style.user_reaction}>
            <Entypo name="heart-outlined" size={24} color="#FF6363" />
            <Text style={style.like_number}>{item.comment_like_count}</Text>
          </View>
        </View>
      </View>
    );
  };

  return listComments && listComments.length > 0 ? (
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
    paddingBottom: 20,
    paddingTop: 10,
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
    paddingLeft: 8,
  },
});
