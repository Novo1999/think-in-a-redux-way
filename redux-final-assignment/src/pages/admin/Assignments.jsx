import { Link } from 'react-router-dom'
import Nav from '../../components/Admin/Nav'
import DeleteEdit from '../../components/DeleteEdit'
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from '../../features/admin/assignment/assignmentApi'

const Assignment = () => {
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery()
  const [deleteAssignment] = useDeleteAssignmentMutation()

  console.log(assignments)

  const handleDelete = (id) => {
    deleteAssignment(id)
  }

  let content = null

  if (isLoading) {
    content = (
      <tr>
        <td>Loading videos...</td>
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

  if (!isLoading && !isError && assignments.length === 0) {
    content = (
      <tr>
        <td>No videos</td>
      </tr>
    )
  }
  if (!isLoading && !isError && assignments.length > 0) {
    content = assignments?.map((ass) => {
      const {
        title,
        video_title: videoTitle,
        totalMark,
        video_id: vidId,
        id,
      } = ass
      return (
        <tr key={id}>
          <td className='table-td'>{title}</td>
          <td className='table-td'>{videoTitle?.slice(0, 60).concat('...')}</td>
          <td className='table-td'>{totalMark}</td>
          <td className='table-td flex gap-x-2'>
            <DeleteEdit
              id={id}
              handleDelete={handleDelete}
              purpose='assignment'
            />
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
      <title>Add Assignment</title>
      {/* Tailwind css */}
      {/*  */}
      <link rel='stylesheet' href='../style/output.css' />
      <Nav />
      <section className='py-6 bg-primary'>
        <div className='mx-auto max-w-full px-5 lg:px-20'>
          <div className='px-3 py-20 bg-opacity-10'>
            <div className='w-full flex'>
              <Link to='/add-assignment' className='btn ml-auto'>
                Add Assignment
              </Link>
            </div>
            <div className='overflow-x-auto mt-4'>
              <table className='divide-y-1 text-base divide-gray-600 w-full'>
                <thead>
                  <tr>
                    <th className='table-th'>Title</th>
                    <th className='table-th'>Video Title</th>
                    <th className='table-th'>Mark</th>
                    <th className='table-th'>Action</th>
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
export default Assignment
