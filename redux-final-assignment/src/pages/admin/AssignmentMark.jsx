import Nav from '../../components/Admin/Nav'
import {
  useEditAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
} from '../../features/admin/marks/assignmentMarkApi'
import { formatDate } from '../../utils/formatDate'
import { useEffect, useRef, useState } from 'react'

const Tick = () => {
  return (
    <svg
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className='w-6 h-6 text-green-500 cursor-pointer hover:text-green-400'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 12.75l6 6 9-13.5'
      />
    </svg>
  )
}

const initialStatusInfos = {
  total: 0,
  pending: 0,
  published: 0,
}

const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    error,
  } = useGetAssignmentMarksQuery()
  const [statusInfos, setStatusInfos] = useState(initialStatusInfos)
  const [marks, setMarks] = useState([])
  const [currentMarkGiving, setCurrentMarkGiving] = useState('')
  const { total = 0, pending = 0, published = 0 } = statusInfos
  const [giveAssignmentMark, { isSuccess }] = useEditAssignmentMarkMutation()
  const inputRefs = useRef({})

  useEffect(() => {
    console.log(isSuccess, inputRefs.current)
    if (isSuccess) {
      if (inputRefs.current[currentMarkGiving]) {
        inputRefs.current[currentMarkGiving].blur()
      }
    }
  }, [isSuccess, currentMarkGiving])

  useEffect(() => {
    if (!isLoading && !isError) {
      setMarks(assignmentMarks)
    }
  }, [assignmentMarks, isLoading, isError])

  useEffect(() => {
    const statusInfosCopy = Object.assign({}, statusInfos)
    if (!isLoading && !isError) {
      assignmentMarks.map((item) => {
        if (item.status === 'pending') {
          statusInfosCopy.pending += 1
        }
        if (item.status === 'published') {
          statusInfosCopy.published += 1
        }
      })
      statusInfosCopy.total = assignmentMarks.length
      setStatusInfos(statusInfosCopy)
    }
  }, [assignmentMarks, isError, isLoading])

  const editAssignmentMark = (e) => {
    e.preventDefault()
    giveAssignmentMark({
      id: currentMarkGiving,
      data: marks?.find((mark) => mark?.id === currentMarkGiving),
    })
  }

  let content = null

  if (isLoading) {
    content = (
      <tr>
        <td>Loading assignments...</td>
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

  if (!isLoading && !isError && assignmentMarks.length === 0) {
    content = (
      <tr>
        <td>No assignments</td>
      </tr>
    )
  }

  if (!isLoading && !isError && assignmentMarks.length > 0) {
    content = assignmentMarks.map((ass) => {
      const {
        id,
        createdAt,
        repo_link: repoLink,
        student_name: studentName,
        title,
      } = ass
      return (
        <tr key={id}>
          <td className='table-td'>{title}</td>
          <td className='table-td'>{formatDate(createdAt)}</td>
          <td className='table-td'>{studentName}</td>
          <td className='table-td'>{repoLink}</td>
          <td className='table-td input-mark'>
            <form onSubmit={editAssignmentMark}>
              <input
                ref={(ref) => (inputRefs.current[id] = ref)}
                onFocus={() => setCurrentMarkGiving(id)}
                max={100}
                value={marks?.find((mark) => mark?.id === id)?.mark || ''}
                onChange={(e) => {
                  setMarks((prevMarks) => {
                    const updatedMarks = prevMarks.map((mark) => {
                      if (mark.id === id) {
                        return { ...mark, mark: +e.target.value }
                      } else {
                        return { ...mark }
                      }
                    })
                    return updatedMarks
                  })
                }}
              />
            </form>
            <Tick />
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
      <title>Assignment Mark</title>
      {/* Tailwind css */}
      {/*  */}
      <link rel='stylesheet' href='../style/output.css' />
      <Nav />
      <section className='py-6 bg-primary'>
        <div className='mx-auto max-w-full px-5 lg:px-20'>
          <div className='px-3 py-20 bg-opacity-10'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className='assignment-status'>
                <li>
                  Total <span>{total}</span>
                </li>
                <li>
                  Pending <span>{pending}</span>
                </li>
                <li>
                  Mark Sent <span>{published}</span>
                </li>
              </ul>
            )}
            <div className='overflow-x-auto mt-4'>
              <table className='divide-y-1 text-base divide-gray-600 w-full'>
                <thead>
                  <tr>
                    <th className='table-th'>Assignment</th>
                    <th className='table-th'>Date</th>
                    <th className='table-th'>Student Name</th>
                    <th className='table-th'>Repo Link</th>
                    <th className='table-th'>Mark</th>
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
export default AssignmentMark
