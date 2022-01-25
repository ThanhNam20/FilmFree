import { BASE_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicApi = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'publicApi',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('lang', 'en');
      headers.set('versionCode', "11");
      headers.set('clienttype', 'ios_jike_default');
      return headers;
    },
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({
    getHome: builder.query({
      query: (page) => `/cms/app/homePage/getHome?page=${page}`,
    }),
    getMovieDetail: builder.query({
      query: ({id, category}) => `/cms/app/movieDrama/get?id=${id}&category=${category}`,
    }),
    getMovieMedia: builder.query({
      query: ({category, contentId, episodeId, definition}) => `cms/app/media/previewInfo?category=${category}&contentId=${contentId}&episodeId=${episodeId}&definition=${definition}`,
    })
  }),
});

export const { useGetHomeQuery, useGetMovieDetailQuery, useGetMovieMediaQuery } = publicApi;
