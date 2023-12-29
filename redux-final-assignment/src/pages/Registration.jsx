import { useEffect, useState } from 'react'
import {
  useCheckUserQuery,
  useRegisterUserMutation,
} from '../features/auth/authApi'
import { Link, useNavigate } from 'react-router-dom'
import { isValidEmail } from '../utils/isValidEmail'

const initialState = {
  name: '',
  email: '',
  password: '',
  role: 'student',
  confirmedPassword: '',
}

const Registration = () => {
  const navigate = useNavigate()
  const [inputInfo, setInputInfo] = useState(initialState)
  const [register] = useRegisterUserMutation()
  const [passwordIsMatched, setPasswordIsMatched] = useState(false)

  const { data } = useCheckUserQuery(inputInfo.email, {
    skip: !isValidEmail(inputInfo.email),
  })
  console.log(data)

  useEffect(() => {
    if (
      inputInfo.password &&
      inputInfo.confirmedPassword !== inputInfo.password
    ) {
      setPasswordIsMatched(false)
    }
    if (
      inputInfo.password &&
      inputInfo.confirmedPassword === inputInfo.password
    ) {
      setPasswordIsMatched(true)
    }
  }, [inputInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    delete inputInfo.confirmedPassword
    register(inputInfo)
      .unwrap()
      .then((res) => {
        if (res.accessToken) {
          navigate('/course')
        }
      })
  }

  return (
    <>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Student Registration</title>
      {/* Tailwind css */}
      {/*  */}
      <link rel='stylesheet' href='../style/output.css' />
      <section className='py-6 bg-primary h-screen grid place-items-center'>
        <div className='mx-auto max-w-md px-5 lg:px-0'>
          <div>
            <img className='h-12 mx-auto' src='/learningportal.svg' />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
              Create Your New Account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='name' className='sr-only'>
                  Name
                </label>
                <input
                  onChange={(e) =>
                    setInputInfo({ ...inputInfo, name: e.target.value })
                  }
                  id='name'
                  name='name'
                  type='name'
                  autoComplete='name'
                  required=''
                  className='login-input rounded-t-md'
                  placeholder='Student Name'
                />
              </div>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  onChange={(e) =>
                    setInputInfo({ ...inputInfo, email: e.target.value })
                  }
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required=''
                  className='login-input '
                  placeholder='Email address'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setInputInfo({ ...inputInfo, password: e.target.value })
                  }
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required=''
                  className='login-input'
                  placeholder='Password'
                />
              </div>
              <div>
                <label htmlFor='confirm-password' className='sr-only'>
                  Confirm Password
                </label>
                <input
                  onChange={(e) =>
                    setInputInfo({
                      ...inputInfo,
                      confirmedPassword: e.target.value,
                    })
                  }
                  id='confirm-password'
                  name='confirm-password'
                  type='password'
                  autoComplete='confirm-password'
                  required=''
                  className='login-input rounded-b-md'
                  placeholder='Confirm Password'
                />
              </div>
              <p
                style={{ marginTop: '20px' }}
                className='cursor-pointer text-purple-500'
              >
                <Link to='/'>Already have an account?</Link>
              </p>
            </div>
            {inputInfo.password &&
              inputInfo.confirmedPassword &&
              !passwordIsMatched && (
                <p className='text-red-500'>Password doesn't match</p>
              )}

            {isValidEmail(inputInfo.email) && data?.at(0)?.email && (
              <p className='text-red-500'>User exists</p>
            )}
            <div>
              <button
                disabled={
                  (inputInfo.password && !passwordIsMatched) ||
                  data?.at(0)?.email
                }
                type='submit'
                style={
                  (inputInfo.password && !passwordIsMatched) ||
                  data?.at(0)?.email
                    ? { cursor: 'not-allowed' }
                    : {}
                }
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
export default Registration
