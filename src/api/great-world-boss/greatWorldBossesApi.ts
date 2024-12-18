
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@/constants';
export const GreatWorldBossesApi = createApi({
  reducerPath: 'GreatWorldBossesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getGreatWorldBosses: builder.query({
      query: () => 'greatWorldBosses',
    }),
  }),
});

export const { useGetGreatWorldBossesQuery } = GreatWorldBossesApi;

