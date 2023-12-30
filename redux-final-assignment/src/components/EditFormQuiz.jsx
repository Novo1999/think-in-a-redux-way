import { useEffect, useState } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useEditQuizMutation,
  useGetQuizQuery,
} from '../features/admin/quizzes/quizzesApi'
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from '../features/admin/videos/videosApi'

const initialState = {
  id: '',
  question: '',
  video_title: '',
  options: [],
  video_id: '',
}

const changeOption = (prevQuizInfo, e, optionNum) => {
  const newOption = e.target.value
  const updatedOptions = prevQuizInfo.options.map((option, index) => {
    if (index === optionNum) {
      return { ...option, option: newOption }
    } else {
      return option
    }
  })

  return {
    ...prevQuizInfo,
    options: updatedOptions,
  }
}

const changeIsCorrect = (prevQuizInfo, optionNum) => {
  const updatedOptions = prevQuizInfo.options.map((option, index) => {
    if (index === optionNum) {
      return { ...option, isCorrect: true }
    } else {
      return option
    }
  })

  return {
    ...prevQuizInfo,
    options: updatedOptions,
  }
}

const EditFormQuiz = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quizInfo, setQuizInfo] = useState(initialState)
  const { question, options } = quizInfo
  const [editQuiz, { isLoading, isError }] = useEditQuizMutation()
  const { data: videos } = useGetVideosQuery()
  const [correctAns, setCorrectAns] = useState('')
  const { data: quiz } = useGetQuizQuery(id)
  const [selectedVideo, setSelectedVideo] = useState('')
  const { data: video } = useGetVideoQuery(selectedVideo, {
    skip: selectedVideo === null,
  })

  console.log(quiz)

  useEffect(() => {
    if (quiz) setSelectedVideo(quiz.video_id)
  }, [quiz])

  useEffect(() => {
    if (quiz) {
      setQuizInfo({
        video_title: video?.title,
        video_id: quiz.video_id,
        id: quiz.id,
        question: quiz.question,
        options: quiz.options,
      })
    }
  }, [quiz, video])

  useEffect(() => {
    const correctAns = options?.find((opt) => opt.isCorrect === true)
    setCorrectAns(correctAns?.id)
  }, [options])

  console.log(correctAns)

  useEffect(() => {
    if (correctAns === 'A') {
      return setQuizInfo((prevQuizInfo) => changeIsCorrect(prevQuizInfo, 0))
    }
    if (correctAns === 'B') {
      return setQuizInfo((prevQuizInfo) => changeIsCorrect(prevQuizInfo, 1))
    }
    if (correctAns === 'C') {
      return setQuizInfo((prevQuizInfo) => changeIsCorrect(prevQuizInfo, 2))
    }
    if (correctAns === 'D') {
      return setQuizInfo((prevQuizInfo) => changeIsCorrect(prevQuizInfo, 3))
    }
  }, [correctAns])

  const handleSubmit = (e) => {
    e.preventDefault()
    editQuiz({ id, data: quizInfo })
    if (!isLoading && !isError) {
      navigate('/quizzes')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-5 bg-white sm:p-6'>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <TextInput
                title='Quiz title'
                value={question}
                onChange={(e) =>
                  setQuizInfo({ ...quizInfo, question: e.target.value })
                }
              />
            </div>
            {console.log(options)}
            <div className='col-span-6'>
              <TextArea
                title='Option - 1'
                value={options[0]?.option}
                onChange={(e) =>
                  setQuizInfo((prevQuizInfo) =>
                    changeOption(prevQuizInfo, e, 0)
                  )
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('A')}
                type='radio'
                name='correct'
                checked={Number(correctAns) === 1}
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                title='Option - 2'
                value={options[1]?.option}
                onChange={(e) =>
                  setQuizInfo((prevQuizInfo) =>
                    changeOption(prevQuizInfo, e, 1)
                  )
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('B')}
                type='radio'
                name='correct'
                checked={Number(correctAns) === 2}
              />
            </div>

            <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
              <TextInput
                title='Option - 3'
                value={options[2]?.option}
                onChange={(e) =>
                  setQuizInfo((prevQuizInfo) =>
                    changeOption(prevQuizInfo, e, 2)
                  )
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('C')}
                type='radio'
                name='correct'
                checked={Number(correctAns) === 3}
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Option - 4'
                value={options[3]?.option}
                onChange={(e) =>
                  setQuizInfo((prevQuizInfo) =>
                    changeOption(prevQuizInfo, e, 3)
                  )
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('D')}
                type='radio'
                name='correct'
                checked={Number(correctAns) === 4}
              />
            </div>

            <div>
              <label style={{ marginRight: '20px' }} htmlFor='video-title'>
                Video Title
              </label>
              <select
                onChange={(e) => {
                  const selectedVideoId = +e.target.value
                  const selectedVideo = videos.find(
                    (el) => el.id === selectedVideoId
                  )

                  setQuizInfo((prevQuizInfo) => ({
                    ...prevQuizInfo,
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
export default EditFormQuiz
