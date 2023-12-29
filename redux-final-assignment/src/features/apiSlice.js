import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../utils/constant'
import { loggedOutUser } from './auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.studentAuth?.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
      api.dispatch(loggedOutUser)
      localStorage.removeItem('token')
    }
    return result
  },
  endpoints: (builder) => ({}),
})
