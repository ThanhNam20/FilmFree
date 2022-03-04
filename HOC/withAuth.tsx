
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE } from '../constants/config';
import { AsyncStorageService } from '../services/storage.service';
import { RootState } from '../store/store';
import { setUserInfo } from '../store/user/userSlice';


export const withAuth = (
  Component: React.ComponentClass | React.FunctionComponent
) =>
  function ComponentWithAuth(props: any) {
    const user = useSelector((state: RootState) => state.UserReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
      getUserData();
    }, []);

    const getUserData = async () => {
      const user_data = await AsyncStorageService.getItem(
        LOCAL_STORAGE.USER_INFO
      );
      if (!user_data) return;
      dispatch(setUserInfo(user_data));
    };
    return <Component {...props}/>;
};
