import { apiSlice } from '../../apiSlice'

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => '/assignments',
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    addAssignment: builder.mutation({
      query: (videoDetails) => ({
        url: '/assignments',
        method: 'POST',
        body: videoDetails,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: addedVideo } = await queryFulfilled
          dispatch(
            assignmentApi.util.updateQueryData(
              'getAssignments',
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
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const result = dispatch(
          assignmentApi.util.updateQueryData(
            'getAssignments',
            undefined,
            (draft) => {
              return draft.filter((el) => el.id !== id)
            }
          )
        )
        try {
          await queryFulfilled
        } catch (error) {
          result.undo()
        }
      },
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          assignmentApi.util.updateQueryData(
            'getAssignments',
            undefined,
            (draft) => {
              const indexToUpdate = draft.findIndex((item) => item.id === +id)
              draft[indexToUpdate] = data
            }
          )
        )
        dispatch(
          assignmentApi.util.updateQueryData('getAssignment', id, (draft) => {
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
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useEditAssignmentMutation,
} = assignmentApi
