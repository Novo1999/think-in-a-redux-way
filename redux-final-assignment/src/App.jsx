import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './pages/student/Layout'
import Portal from './pages/student/Portal'
import Login from './pages/student/Login'
import { Provider } from 'react-redux'
import { store } from './features/app/store'
import CoursePlayer from './pages/student/CoursePlayer'
import Registration from './pages/student/Registration'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import StudentPrivateRoute from './components/Student/PrivateRoute'
import AdminPrivateRoute from './components/Admin/PrivateRoute'
import Leaderboard from './pages/admin/Leaderboard'
import Quiz from './pages/student/Quiz'
import Assignment from './pages/admin/Assignments'
import AssignmentMark from './pages/admin/AssignmentMark'
import Quizzes from './pages/admin/Quizzes'
import Videos from './pages/admin/Videos'
import AddVideo from './pages/admin/AddVideo'
import EditVideo from './pages/admin/EditVideo'
import AddAssignment from './pages/admin/AddAssignment'
import EditAssignment from './pages/admin/EditAssignment'
import AddQuiz from './pages/admin/AddQuiz'
import EditFormQuiz from './components/EditFormQuiz'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <p>ERROR!</p>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/create-new-account',
        element: <Registration />,
      },
      {
        path: '/portal',
        element: <Portal />,
      },
      {
        path: '/course',
        element: (
          <StudentPrivateRoute>
            <CoursePlayer />
          </StudentPrivateRoute>
        ),
      },
      {
        path: '/leaderboard',
        element: (
          <StudentPrivateRoute>
            <Leaderboard />
          </StudentPrivateRoute>
        ),
      },
      {
        path: '/quiz',
        element: (
          <StudentPrivateRoute>
            <Quiz />
          </StudentPrivateRoute>
        ),
      },
      {
        path: '/admin-login',
        element: <AdminLogin />,
      },
      {
        path: '/dashboard',
        element: (
          <AdminPrivateRoute>
            <Dashboard />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/assignment',
        element: (
          <AdminPrivateRoute>
            <Assignment />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/assignment-mark',
        element: (
          <AdminPrivateRoute>
            <AssignmentMark />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/quizzes',
        element: (
          <AdminPrivateRoute>
            <Quizzes />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/videos',
        element: (
          <AdminPrivateRoute>
            <Videos />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/add-video',
        element: (
          <AdminPrivateRoute>
            <AddVideo />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/edit-video/:id',
        element: (
          <AdminPrivateRoute>
            <EditVideo />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/add-assignment',
        element: (
          <AdminPrivateRoute>
            <AddAssignment />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/edit-assignment/:id',
        element: (
          <AdminPrivateRoute>
            <EditAssignment />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/add-quiz',
        element: (
          <AdminPrivateRoute>
            <AddQuiz />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/edit-quiz/:id',
        element: (
          <AdminPrivateRoute>
            <EditFormQuiz />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/add-assignment',
        element: (
          <AdminPrivateRoute>
            <AddAssignment />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/edit-assignment/:id',
        element: (
          <AdminPrivateRoute>
            <EditAssignment />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
