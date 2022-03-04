import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/user/userSlice";
import { AsyncStorageService } from "../../services/storage.service";
import { LOCAL_STORAGE } from "../../constants/config";
import { useNavigation } from "@react-navigation/native";
import { FireStoreService } from "../../services/firestore.service";
import UserInfoModel from "../../model/user-info.model";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(async (user_info: any) => {
        dispatch(setUserInfo(user_info.user));
        const userInfoSaveStore: UserInfoModel = {
          uid: user_info.user.uid,
          user_avatar: user_info.user.photoURL,
          user_name: user_info.user.displayName,
          user_email: user_info.user.email
        }

        FireStoreService.findUserByUid(user_info.user.uid).get().then((firebaseData: any) =>{
          if(firebaseData.empty !== false) {
            FireStoreService.setUserInfo(userInfoSaveStore);
          }
        })

        AsyncStorageService.setItem(user_info.user, LOCAL_STORAGE.USER_INFO);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]}>
        <View style={styles.socialButtonContent}>
          <Image
            style={[styles.icon, styles.socialIcon]}
            source={require("../../assets/images/facebook-icon.png")}
          />
          <Text style={styles.loginText}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onGoogleButtonPress}
        style={[styles.buttonContainer, styles.googleButton]}
      >
        <View style={styles.socialButtonContent}>
          <Image
            style={[styles.icon, styles.socialIcon]}
            source={require("../../assets/images/google-icon.png")}
          />
          <Text style={styles.loginText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#ff0000",
  },
  loginText: {
    color: "white",
  },
  restoreButtonContainer: {
    width: 250,
    marginBottom: 15,
    alignItems: "flex-end",
  },
  socialButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
