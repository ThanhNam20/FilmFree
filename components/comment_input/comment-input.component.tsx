import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { mainColor } from "../../constants/config";

const CommentInputComponent = (props: any) => {
  const [message, setMessage] = useState("");
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<any>(false);

  const [keyboardStatus, setKeyboardStatus] = useState("");

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
                props.changeHeightOjInput(150);
              } else {
                props.changeHeightOjInput(350);
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
              props.changeHeightOjInput(75);
            }}

            onSubmitEditing={() =>{
              Keyboard.dismiss;
              props.changeHeightOjInput(350);
            }}

            onBlur={() =>{
              props.changeHeightOjInput(350);
            }}
          />
        </View>

        <Pressable style={styles.buttonContainer}>
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
