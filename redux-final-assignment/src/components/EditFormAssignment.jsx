import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useEditAssignmentMutation,
  useGetAssignmentQuery,
} from '../features/admin/assignment/assignmentApi'
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from '../features/admin/videos/videosApi'

const initialState = {
  title: '',
  totalMark: '',
  video_title: '',
}

const EditFormAssignment = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [assignmentInfo, setAssignmentInfo] = useState(initialState)
  const { title, totalMark } = assignmentInfo
  const [editAssignment, { isLoading, isError }] = useEditAssignmentMutation()
  const { data: assignment } = useGetAssignmentQuery(id)
  const { data: videos } = useGetVideosQuery()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const { data: video } = useGetVideoQuery(selectedVideo, {
    skip: selectedVideo === null,
  })

  useEffect(() => {
    if (assignment?.video_id) {
      console.log(assignment.video_id)
      setSelectedVideo(assignment?.video_id)
    }
  }, [assignment])

  useEffect(() => {
    if (video?.id) {
      setAssignmentInfo({ ...assignmentInfo, video_id: video.id })
    }
  }, [video, setAssignmentInfo])

  useEffect(() => {
    setAssignmentInfo({
      ...assignmentInfo,
      video_title: assignment?.video_title || '',
      totalMark: assignment?.totalMark || '',
      title: assignment?.title || '',
      id: assignment?.id || '',
    })
  }, [assignment])

  const handleSubmit = (e) => {
    e.preventDefault()
    editAssignment({ id, data: assignmentInfo })
    if (!isLoading && !isError) {
      navigate('/assignment')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-5 bg-white sm:p-6'>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <TextInput
                title='Title'
                value={title}
                onChange={(e) =>
                  setAssignmentInfo({
                    ...assignmentInfo,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <TextInput
                title='Total Mark'
                value={totalMark}
                onChange={(e) =>
                  setAssignmentInfo({
                    ...assignmentInfo,
                    totalMark: e.target.value,
                  })
                }
              />
            </div>
            <label htmlFor='video-title'>Video Title</label>
            {console.log(video?.title)}
            <select
              onChange={(e) => {
                const selectedVideoId = +e.target.value
                const selectedVideo = videos.find(
                  (el) => el.id === selectedVideoId
                )

                setAssignmentInfo((prevAssignmentInfo) => ({
                  ...prevAssignmentInfo,
                  video_title: selectedVideo?.title,
                }))

                setSelectedVideo(selectedVideoId)
              }}
              value={selectedVideo || ''}
              style={{ color: 'black' }}
              name='video-title'
            >
              {videos?.map((vid) => (
                <option key={vid.id} value={vid.id}>
                  {vid.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
          <button
            type='submit'
            className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
export default EditFormAssignment
