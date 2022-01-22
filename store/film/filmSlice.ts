import { publicApi } from './../../services/public-api.service';
import { createSlice } from "@reduxjs/toolkit";

const initState: any = {
  listFilmData: [],
  filmDetailData: null
};

const filmSlice = createSlice({
  name: 'film',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) =>{
    builder.addMatcher(publicApi.endpoints.getHome.matchFulfilled,(state, action) =>{
      state.listFilmData = [...state.listFilmData, ...action.payload.data.recommendItems];
    }),
    builder.addMatcher(publicApi.endpoints.getMovieDetail.matchFulfilled,(state, action) =>{
      state.filmDetailData = action.payload.data.recommendItems.payload.data;
    })
  }

})

const { reducer, actions } = filmSlice;
export const {} = actions;
export const FilmReducer = reducer;