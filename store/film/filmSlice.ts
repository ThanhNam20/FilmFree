import { publicApi } from './../../services/public-api.service';
import { createSlice } from "@reduxjs/toolkit";

const initState: any = {
  listFilmData: [],
  filmDetailData: null,
  filmDetailMediaList: [],
  isLoading: false
};

const filmSlice = createSlice({
  name: 'film',
  initialState: initState,
  reducers: {
    removeMovieDetailData: (state) => {
      state.filmDetailMediaList = [],
      state.isLoading = false
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(publicApi.endpoints.getHome.matchFulfilled, (state, action) => {
      state.listFilmData = [...state.listFilmData, ...action.payload.data.recommendItems];
    }),
      builder.addMatcher(publicApi.endpoints.getMovieDetail.matchFulfilled, (state, action) => {
        state.filmDetailData = action.payload.data;
      }),

      builder.addMatcher(publicApi.endpoints.getMovieMedia.matchPending, (state, action) => {
        state.isLoading = true;
      }),

      builder.addMatcher(publicApi.endpoints.getMovieMedia.matchFulfilled, (state, action) => {
        state.filmDetailMediaList = [...state.filmDetailMediaList, action.payload.data];
        state.isLoading = false;
      }),

      builder.addMatcher(publicApi.endpoints.getMovieMediaByEpisode.matchPending, (state, action) => {
        state.isLoading = true;
      }),
      
      builder.addMatcher(publicApi.endpoints.getMovieMediaByEpisode.matchFulfilled, (state, action) => {
        state.filmDetailMediaList = [...state.filmDetailMediaList, action.payload.data];
        state.isLoading = false;
      })
  }
})

const { reducer, actions } = filmSlice;
export const { removeMovieDetailData } = actions;
export const FilmReducer = reducer;