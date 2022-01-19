import { BASE_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const privateApi = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'privateApi',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({}),
});