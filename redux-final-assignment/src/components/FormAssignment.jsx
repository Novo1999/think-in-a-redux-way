import { useEffect, useState } from 'react'
import TextInput from './TextInput'

import { useNavigate } from 'react-router-dom'
import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
} from '../features/admin/assignment/assignmentApi'
import { useGetVideosQuery } from '../features/admin/videos/videosApi'

const initialState = {
  title: '',
  totalMark: '',
  video_title: '',
}

const FormAssignment = () => {
  const navigate = useNavigate()
  const [assignmentInfo, setAssignmentInfo] = useState(initialState)
  const { title, totalMark, video_title: videoTitle } = assignmentInfo
  const [addAssignment, { isLoading, isError }] = useAddAssignmentMutation()
  const { data: assignments } = useGetAssignmentsQuery()
  const { data: videos } = useGetVideosQuery()

  useEffect(() => {
    setAssignmentInfo({ ...assignmentInfo, video_title: videos?.at(0)?.title })
  }, [videos])

  console.log(assignments?.length)

  console.log(assignmentInfo)

  const handleSubmit = (e) => {
    e.preventDefault()

    const assignmentInfoCopy = Object.assign({}, assignmentInfo)

    // dynamically increasing the assignment number
    assignmentInfoCopy.title = `Assignment ${assignments?.length + 1} - ${
      assignmentInfo.title
    }`

    addAssignment(assignmentInfoCopy)
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
            <select
              onChange={(e) =>
                setAssignmentInfo({
                  ...assignmentInfo,
                  video_title: e.target.value,
                })
              }
              value={videoTitle}
              style={{ color: 'black' }}
              name='video-title'
            >
              {videos?.map((vid) => (
                <option key={vid.id} value={vid.title}>
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
export default FormAssignment
