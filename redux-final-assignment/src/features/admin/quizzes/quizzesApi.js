import { apiSlice } from '../../apiSlice'

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => '/quizzes',
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    addQuiz: builder.mutation({
      query: (details) => ({
        url: '/quizzes',
        method: 'POST',
        body: details,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: addedVideo } = await queryFulfilled
          dispatch(
            quizzesApi.util.updateQueryData(
              'getQuizzes',
              undefined,
              (draft) => {
                return [...draft, addedVideo]
              }
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const result = dispatch(
          quizzesApi.util.updateQueryData('getQuizzes', undefined, (draft) => {
            return draft.filter((el) => el.id !== id)
          })
        )
        try {
          await queryFulfilled
        } catch (error) {
          result.undo()
        }
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          quizzesApi.util.updateQueryData('getQuizzes', undefined, (draft) => {
            const indexToUpdate = draft.findIndex((item) => item.id === +id)
            draft[indexToUpdate] = data
          })
        )
        dispatch(
          quizzesApi.util.updateQueryData('getQuiz', id, (draft) => {
            draft = data
            return draft
          })
        )
        try {
          await queryFulfilled
        } catch (error) {
          result.undo()
        }
      },
    }),
  }),
})

export const {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useGetQuizQuery,
  useGetQuizzesQuery,
  useEditQuizMutation,
} = quizzesApi
