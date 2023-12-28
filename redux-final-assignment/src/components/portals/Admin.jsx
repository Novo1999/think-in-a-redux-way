const Admin = () => {
  return (
    <div className='bg-slate-900 p-4 border border-slate-700/80 rounded-md'>
      <h1 className='text-slate-100 font-bold text-xl'>Admin Portal</h1>
      <div className='space-y-2 mt-4 flex flex-col'>
        <a className='link' href='./Dashboard/Dashboard.html'>
          Dashboard
        </a>
        <a className='link' href='./Dashboard/AdminLogin.html'>
          AdminLogin
        </a>
        <a className='link' href='./Dashboard/Assignment.html'>
          Assignment
        </a>
        <a className='link' href='./Dashboard/AssignmentMark.html'>
          AssignmentMark
        </a>
        <a className='link' href='./Dashboard/Quizzes.html'>
          Quizzes
        </a>
        <a className='link' href='./Dashboard/Videos.html'>
          Videos
        </a>
      </div>
    </div>
  )
}
export default Admin
