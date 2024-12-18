import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants';
export const caphrasEquipmentApi = createApi({
  reducerPath: 'equipmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getEquipments: builder.query({
      query: () => '/caphras'
    })
  })
});

export const { useGetEquipmentsQuery } = caphrasEquipmentApi;
