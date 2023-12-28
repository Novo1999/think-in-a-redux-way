import { apiSlice } from '../apiSlice'
import { loggedInUser } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkUser: builder.query({
      query: (email) => `/users?email_like=${email}`,
      transformResponse: (response) => {
        if (response?.at(0)?.email) {
          return response.map((res) => ({ ...res, password: null }))
        }
      },
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(loggedInUser(data))
          localStorage.setItem('token', JSON.stringify(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(loggedInUser(data))
          localStorage.setItem('token', JSON.stringify(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useCheckUserQuery,
  useLoginUserMutation,
} = authApi
