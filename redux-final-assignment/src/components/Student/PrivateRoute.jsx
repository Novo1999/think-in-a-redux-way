import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const userExists = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    // making student route private for admins
    if (!userExists || userExists?.user?.role === 'admin') {
      navigate('/')
    }
  }, [userExists, navigate])

  return <div>{children}</div>
}
export default PrivateRoute
