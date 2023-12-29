import { apiSlice } from '../../apiSlice'

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => '/videos',
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (videoDetails) => ({
        url: '/videos',
        method: 'POST',
        body: videoDetails,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: addedVideo } = await queryFulfilled
          dispatch(
            videosApi.util.updateQueryData('getVideos', undefined, (draft) => {
              return [...draft, addedVideo]
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const result = dispatch(
          videosApi.util.updateQueryData('getVideos', undefined, (draft) => {
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
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          videosApi.util.updateQueryData('getVideos', undefined, (draft) => {
            const indexToUpdate = draft.findIndex((item) => item.id === +id)
            draft[indexToUpdate] = data
          })
        )
        dispatch(
          videosApi.util.updateQueryData('getVideo', id, (draft) => {
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
  useAddVideoMutation,
  useGetVideosQuery,
  useDeleteVideoMutation,
  useEditVideoMutation,
  useGetVideoQuery,
} = videosApi
