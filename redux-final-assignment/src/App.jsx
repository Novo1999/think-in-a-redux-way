import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Portal from './pages/Portal'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import { store } from './features/app/store'
import CoursePlayer from './pages/CoursePlayer'
import Registration from './pages/Registration'

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
        element: <CoursePlayer />,
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
