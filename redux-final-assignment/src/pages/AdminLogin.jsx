import { Link, useNavigate } from 'react-router-dom'
import { isValidEmail } from '../utils/isValidEmail'
import { useEffect, useState } from 'react'
import { useLoginAdminMutation } from '../features/auth/authApi'
const AdminLogin = () => {
  const navigate = useNavigate()
  const userExists = JSON.parse(localStorage.getItem('token'))
  const [inputValue, setInputValue] = useState({ email: '', password: '' })
  const [login, { data, isError, error }] = useLoginAdminMutation()

  useEffect(() => {
    if (userExists && userExists?.user?.role === 'admin') {
      navigate('/dashboard')
    }
  }, [userExists, navigate])

  useEffect(() => {
    if (data?.accessToken && data?.user?.role === 'admin') {
      navigate('/dashboard')
    }
  }, [data, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValidEmail(inputValue.email) && inputValue.password) {
      login(inputValue)
    }
  }

  return (
    <>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Admin Login</title>
      {/* Tailwind css */}
      {/*  */}
      <section className='py-6 bg-primary h-screen grid place-items-center'>
        <div className='mx-auto max-w-md px-5 lg:px-0'>
          <div>
            <img className='h-12 mx-auto' src='/learningportal.svg' />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
              Sign in to Admin Account
            </h2>
          </div>
          <form className='mt-8 space-y-6' onClick={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required=''
                  className='login-input rounded-t-md'
                  placeholder='Email address'
                  onChange={(e) =>
                    setInputValue({ ...inputValue, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required=''
                  className='login-input rounded-b-md'
                  placeholder='Password'
                  onChange={(e) =>
                    setInputValue({ ...inputValue, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='flex items-center gap-6 justify-end'>
              <div className='text-sm'>
                <Link
                  to='/'
                  className='font-medium text-violet-200 hover:text-violet-500'
                >
                  I am a student
                </Link>
              </div>
            </div>
            {isError && <p className='text-red-500'>{error?.data}</p>}
            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
export default AdminLogin
