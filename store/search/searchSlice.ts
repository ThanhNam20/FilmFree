import { publicApi } from './../../services/public-api.service';
import { createSlice } from "@reduxjs/toolkit";

const initState: any = {
  recommendMovieList: [],
  searchAutoCompleteMovieList: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) =>{
    builder.addMatcher(publicApi.endpoints.getListRecommendMovie.matchFulfilled,(state, action) =>{
      state.recommendMovieList = action.payload.data.list;
    }),
    builder.addMatcher(publicApi.endpoints.searchMovieComplete.matchFulfilled,(state, action) =>{
      state.searchAutoCompleteMovieList = action.payload.data.searchResults;
    })
  }

  
})

const { reducer, actions } = searchSlice;
export const {} = actions;
export const SearchReducer = reducer;