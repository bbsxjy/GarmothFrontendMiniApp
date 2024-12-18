
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@/constants';
export const changeLogApi = createApi({
  reducerPath: 'changeLogApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getChangeLog: builder.query({
      query: () => '/changeLog',
    }),
  }),
});

export const { useGetChangeLogQuery } = changeLogApi;