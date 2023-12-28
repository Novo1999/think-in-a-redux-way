import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const userExists = localStorage.getItem('token')

  useEffect(() => {
    if (!userExists) {
      navigate('/')
    }
  }, [userExists, navigate])

  return <div>{children}</div>
}
export default PrivateRoute
