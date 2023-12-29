import { configureStore } from '@reduxjs/toolkit'
import { authApi as StudentAuthApi } from '../auth/authApi'
import authReducer from '../auth/authSlice'

export const store = configureStore({
  reducer: {
    [StudentAuthApi.reducerPath]: StudentAuthApi.reducer,
    studentAuth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudentAuthApi.middleware),
})
