import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Portal from './pages/Portal'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import { store } from './features/app/store'
import CoursePlayer from './pages/CoursePlayer'
import Registration from './pages/Registration'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import StudentPrivateRoute from './components/Student/PrivateRoute'
import AdminPrivateRoute from './components/Admin/PrivateRoute'

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
