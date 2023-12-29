import { useState } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import { useAddVideoMutation } from '../features/admin/videos/videosApi'
import { useNavigate } from 'react-router-dom'

const initialState = {
  title: '',
  description: '',
  url: '',
  createdAt: '',
  duration: '',
  views: '',
}

const Form = () => {
  const navigate = useNavigate()
  const [videoInfo, setVideoInfo] = useState(initialState)
  const { title, description, duration, url, createdAt, views } = videoInfo
  const [addVideo, { isLoading, isError }] = useAddVideoMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    addVideo(videoInfo)
    if (!isLoading && !isError) {
      navigate('/videos')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-5 bg-white sm:p-6'>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <TextInput
                title='Video title'
                value={title}
                onChange={(e) =>
                  setVideoInfo({ ...videoInfo, title: e.target.value })
                }
              />
            </div>

            <div className='col-span-6'>
              <TextArea
                title='Description'
                value={description}
                onChange={(e) =>
                  setVideoInfo({ ...videoInfo, description: e.target.value })
                }
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                title='YouTube Video link'
                value={url}
                onChange={(e) =>
                  setVideoInfo({ ...videoInfo, url: e.target.value })
                }
              />
            </div>

            <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
              <TextInput
                title='Upload Date'
                value={createdAt}
                onChange={(e) =>
                  setVideoInfo({ ...videoInfo, createdAt: e.target.value })
                }
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Video Duration'
                value={duration}
                onChange={(e) =>
                  setVideoInfo({ ...videoInfo, duration: e.target.value })
                }
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Video no of views'
                value={views}
                onChange={(e) =>
                  setVideoInfo({ ...videoInfo, views: e.target.value })
                }
              />
            </div>
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
export default Form
