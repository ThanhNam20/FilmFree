import { configureStore } from '@reduxjs/toolkit'
import { privateApi } from '../services/private-api.service';
import { publicApi } from '../services/public-api.service';



export const store = configureStore({
  reducer: {
    [privateApi.reducerPath]: privateApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(privateApi.middleware).concat(publicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch