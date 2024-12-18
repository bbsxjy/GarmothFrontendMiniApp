import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants';
export const characterDefaultApi = createApi({
  reducerPath: 'characterDefaultApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCharacterDefaultData: builder.query({
      query: () => '/characterDefaultData', 
    }),
  }),
});

export const { useGetCharacterDefaultDataQuery } = characterDefaultApi;
