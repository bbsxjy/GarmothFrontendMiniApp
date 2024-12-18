
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@/constants';
export const NewsApi = createApi({
  reducerPath: 'NewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => '/news',
    }),
  }),
});

export const { useGetNewsQuery } = NewsApi;