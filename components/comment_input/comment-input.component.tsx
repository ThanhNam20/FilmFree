import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { useSelector } from "react-redux";
import { forcusColor, mainColor } from "../../constants/config";
import MovieCommentModel from "../../model/movie-comment.model";
import { FireStoreService } from "../../services/firestore.service";
import { RootState } from "../../store/store";

const CommentInputComponent = ({ props }: any) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<any>(false);
  const [keyboardStatus, setKeyboardStatus] = useState("");
  const userReducer = useSelector(
    (state: RootState) => state.UserReducer.userInfo
  );
  const [changeHeightOjInput, movieId] = props;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Post comment success",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const sendComment = () => {
    if (message == "") return;
    const commentUser: MovieCommentModel = {
      comment_dislike_count: 0,
      comment_like_count: 0,
      comment_title: message,
      created_at: new Date(),
      film_id: `${movieId}`,
      user_avatar: userReducer.photoURL,
      user_name: userReducer.displayName,
    };
    setMessage("");
    Keyboard.dismiss();
    changeHeightOjInput(350);
    setIsOpenEmojiPicker(!isOpenEmojiPicker);
    FireStoreService.addMovieComment(commentUser).then(() => {
      showToastWithGravityAndOffset();
    });
  };

  if (userReducer == null) {
    return (
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{ textAlign: "center", color: "white" }}>
          You can't post comment without Login ?
        </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: forcusColor,
              paddingLeft: 5
            }}
          >Login
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isOpenEmojiPicker ? "50%" : "auto" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() => {
              if (isOpenEmojiPicker == !true) {
                Keyboard.dismiss();
                changeHeightOjInput(150);
              } else {
                Keyboard.dismiss();
                changeHeightOjInput(350);
              }
              setIsOpenEmojiPicker(!isOpenEmojiPicker);
            }}
          >
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>

          <TextInput
            value={message}
            style={styles.input}
            placeholder="Enter message..."
            onChangeText={setMessage}
            onFocus={() => {
              changeHeightOjInput(75);
            }}
            onSubmitEditing={() => {
              changeHeightOjInput(350);
            }}
            onBlur={() => {
              changeHeightOjInput(350);
              if (isOpenEmojiPicker === true) {
                setIsOpenEmojiPicker(!isOpenEmojiPicker);
              }
            }}
          />
        </View>

        <Pressable onPress={sendComment} style={styles.buttonContainer}>
          {message ? (
            <Ionicons name="send" color="white" size={20} />
          ) : (
            <AntDesign name="plus" size={20} color="white" />
          )}
        </Pressable>
      </View>
      {isOpenEmojiPicker ? (
        <EmojiSelector
          category={Categories.emotion}
          onEmojiSelected={(emoji) =>
            setMessage((currentMessgae) => currentMessgae + emoji)
          }
          showSearchBar={false}
          columns={8}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default CommentInputComponent;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: mainColor,
    minHeight: 500,
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3777f0",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 35,
  },
});
