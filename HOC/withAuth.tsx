
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LOCAL_STORAGE } from '../constants/config';
import { AsyncStorageService } from '../services/storage.service';
import { RootState } from '../store/store';


export const withAuth = (
  Component: React.ComponentClass | React.FunctionComponent
) =>
  function ComponentWithAuth(props: any) {
    const user = useSelector((state: RootState) => state.UserReducer);
    const navigation = useNavigation();

    useEffect(() => {
      // const token = storageService.getLocal('token');
      // if (!token && !user._id) router.push('/login');
      // else if (!token && user._id) storageService.removeLocal('token');
      // else if (token && user._id && roles.length && !roles.includes(user.role))
      //   router.push('/401');
      getUserData();
      
    }, [user]);

    const getUserData = async () => {
      const user_data = await AsyncStorageService.getItem(
        LOCAL_STORAGE.USER_INFO
      );
      if(!user_data) {
        navigation.navigate('Login');
      }
    };

    // const checkAuth = () => {
    //   if (user._id) {
    //     if (!roles.length) return true;

    //     if (roles.includes(user.role)) return true;
    //   }
    //   return false;
    // };

    // return checkAuth() && <Component {...props} router={router} user={user} />;

    return <Component {...props}/>;
};
