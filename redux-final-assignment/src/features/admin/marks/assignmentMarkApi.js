import { apiSlice } from '../../apiSlice'

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => '/assignmentMark',
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          assignmentMarkApi.util.updateQueryData(
            'getAssignmentMarks',
            undefined,
            (draft) => {
              const indexToUpdate = draft.findIndex((item) => item.id === +id)
              draft[indexToUpdate] = data
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
  }),
})

export const { useGetAssignmentMarksQuery, useEditAssignmentMarkMutation } =
  assignmentMarkApi
