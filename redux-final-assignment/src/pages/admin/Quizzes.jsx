import { Link } from 'react-router-dom'
import Nav from '../../components/Admin/Nav'
import DeleteEdit from '../../components/DeleteEdit'
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from '../../features/admin/quizzes/quizzesApi'

const Quizzes = () => {
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery()
  const [deleteQuiz] = useDeleteQuizMutation()

  const handleDelete = (id) => {
    deleteQuiz(id)
  }

  let content = null

  if (isLoading) {
    content = (
      <tr>
        <td>Loading quizzes...</td>
      </tr>
    )
  }
  if (!isLoading && isError) {
    content = (
      <tr>
        <td>{error}</td>
      </tr>
    )
  }

  if (!isLoading && !isError && quizzes.length === 0) {
    content = (
      <tr>
        <td>No videos</td>
      </tr>
    )
  }
  if (!isLoading && !isError && quizzes.length > 0) {
    content = quizzes?.map((quiz) => {
      const { question, video_title: videoTitle, id } = quiz
      return (
        <tr key={id}>
          <td className='table-td'>{question}</td>
          <td className='table-td'>{videoTitle?.slice(0, 60).concat('...')}</td>
          <td className='table-td flex gap-x-2'>
            <DeleteEdit id={id} handleDelete={handleDelete} purpose='quiz' />
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Quizzes</title>
      <link rel='stylesheet' href='../style/output.css' />
      <Nav />
      <section className='py-6 bg-primary'>
        <div className='mx-auto max-w-full px-5 lg:px-20'>
          <div className='px-3 py-20 bg-opacity-10'>
            <div className='w-full flex'>
              <Link to='/add-quiz' className='btn ml-auto'>
                Add Quiz
              </Link>
            </div>
            <div className='overflow-x-auto mt-4'>
              <table className='divide-y-1 text-base divide-gray-600 w-full'>
                <thead>
                  <tr>
                    <th className='table-th'>Question</th>
                    <th className='table-th'>Video</th>
                    <th className='table-th justify-center'>Action</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-600/50'>
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Quizzes
