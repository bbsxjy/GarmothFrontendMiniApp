import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../customBaseQuery'
import { API_BASE_URL } from '@/constants'
import type { Skill, SkillAddon, SkillAddonDetail } from '@/types'
// Create the SkillsAddonApi
export const SkillsAddonApi = createApi({
  reducerPath: 'SkillsAddonApi',
  baseQuery: customBaseQuery, // Use your base URL
  endpoints: builder => ({
    // Query to fetch available skills addons
    getAvailableSkillAddons: builder.query<SkillAddon[], void>({
      query: () => ({ url: `${API_BASE_URL}/skills/addons/available` }),
    }),

    // Query to fetch skills addon details
    getSkillAddonDetails: builder.query<SkillAddonDetail[], void>({
      query: () => ({ url: `${API_BASE_URL}/skills/addons/details` }),
    }),

    // Query to fetch skills
    getSkills: builder.query<Skill[], void>({
      query: () => ({ url: `${API_BASE_URL}/skills` }),
    }),
  }),
})

// Export the auto-generated hooks for the queries
export const {
  useGetAvailableSkillAddonsQuery,
  useGetSkillAddonDetailsQuery,
  useGetSkillsQuery,
} = SkillsAddonApi
