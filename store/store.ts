import { UserReducer } from './user/userSlice';
import { configureStore } from '@reduxjs/toolkit'
import { privateApi } from '../services/private-api.service';
import { publicApi } from '../services/public-api.service';
import { FilmReducer } from './film/filmSlice';



export const store = configureStore({
  reducer: {
    [privateApi.reducerPath]: privateApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    UserReducer,
    FilmReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(privateApi.middleware).concat(publicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch