import { configureStore } from '@reduxjs/toolkit'
import { authApi as StudentAuthApi } from '../auth/student/authApi'
import authReducer from '../auth/student/authSlice'

export const store = configureStore({
  reducer: {
    [StudentAuthApi.reducerPath]: StudentAuthApi.reducer,
    studentAuth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudentAuthApi.middleware),
})
