import { useEffect, useState } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import { useNavigate } from 'react-router-dom'
import {
  useAddQuizMutation,
  useGetQuizQuery,
} from '../features/admin/quizzes/quizzesApi'
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from '../features/admin/videos/videosApi'

const initialState = {
  question: '',
  video_title: '',
  optA: { option: '', id: 1, isCorrect: false },
  optB: { option: '', id: 2, isCorrect: false },
  optC: { option: '', id: 3, isCorrect: false },
  optD: { option: '', id: 4, isCorrect: false },
  video_id: '',
}

const FormQuiz = () => {
  const navigate = useNavigate()
  const [quizInfo, setQuizInfo] = useState(initialState)
  const { question, optA, optB, optC, optD } = quizInfo
  const [addQuiz, { isLoading, isError }] = useAddQuizMutation()
  const { data: videos } = useGetVideosQuery()
  const [selectedVideo, setSelectedVideo] = useState(1)
  const [correctAns, setCorrectAns] = useState('')
  const { data: video } = useGetVideoQuery(selectedVideo, {
    skip: selectedVideo === null,
  })

  useEffect(() => {
    const copy = Object.assign({}, quizInfo)

    // resetting the isCorrect
    for (const property in copy) {
      if (copy[property].isCorrect === true) {
        copy[property].isCorrect = false
        setQuizInfo(copy)
      }
    }

    if (correctAns === 'A') {
      return setQuizInfo({ ...quizInfo, optA: { ...optA, isCorrect: true } })
    }
    if (correctAns === 'B') {
      return setQuizInfo({ ...quizInfo, optB: { ...optB, isCorrect: true } })
    }
    if (correctAns === 'C') {
      return setQuizInfo({ ...quizInfo, optC: { ...optC, isCorrect: true } })
    }
    if (correctAns === 'D') {
      return setQuizInfo({ ...quizInfo, optD: { ...optD, isCorrect: true } })
    }
  }, [correctAns])

  useEffect(() => {
    if (video) {
      setQuizInfo({ ...quizInfo, video_title: video.title, video_id: video.id })
    }
  }, [video])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ...quizInfo,
      options: [optA, optB, optC, optD],
    }
    delete data.optA
    delete data.optB
    delete data.optC
    delete data.optD

    addQuiz(data)
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

            <div className='col-span-6'>
              <TextArea
                title='Option - 1'
                value={optA.option}
                onChange={(e) =>
                  setQuizInfo({
                    ...quizInfo,
                    optA: { ...optA, option: e.target.value },
                  })
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('A')}
                type='radio'
                name='correct'
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                title='Option - 2'
                value={optB.option}
                onChange={(e) =>
                  setQuizInfo({
                    ...quizInfo,
                    optB: { ...optB, option: e.target.value },
                  })
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('B')}
                type='radio'
                name='correct'
              />
            </div>

            <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
              <TextInput
                title='Option - 3'
                value={optC.option}
                onChange={(e) =>
                  setQuizInfo({
                    ...quizInfo,
                    optC: { ...optC, option: e.target.value },
                  })
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('C')}
                type='radio'
                name='correct'
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Option - 4'
                value={optD.option}
                onChange={(e) =>
                  setQuizInfo({
                    ...quizInfo,
                    optD: { ...optD, option: e.target.value },
                  })
                }
              />
              <label>Correct </label>
              <input
                onChange={() => setCorrectAns('D')}
                type='radio'
                name='correct'
              />
            </div>
            <div>
              <label style={{ marginRight: '20px' }} htmlFor='video-title'>
                Video Title
              </label>
              <select
                onChange={(e) => setSelectedVideo(+e.target.value)}
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
export default FormQuiz
