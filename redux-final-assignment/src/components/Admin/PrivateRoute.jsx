import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const userExists = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    // making admin route private for students
    if (!userExists || userExists?.user?.role === 'student') {
      navigate('/admin-login')
    }
  }, [userExists, navigate])

  return <div>{children}</div>
}
export default PrivateRoute
