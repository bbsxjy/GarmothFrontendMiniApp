
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ImperialCratesLevel } from '@/types';
import { API_BASE_URL } from '@/constants';
export const ImperialCratesLevelApi = createApi({
  reducerPath: 'ImperialCratesLevelApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getImperialCratesLevel: builder.query<ImperialCratesLevel[], void>({
      query: () => '/imperialCratesLevel',
    }),
  }),
});

export const { useGetImperialCratesLevelQuery } = ImperialCratesLevelApi;
