const Student = () => {
  return (
    <div className='bg-slate-900 p-4 border border-slate-700/80 rounded-md'>
      <h1 className='text-slate-100 font-bold text-xl'>Student Portal</h1>
      <div className='space-y-2 mt-4 flex flex-col'>
        <a className='link' href='./StudentPortal/Course Player.html'>
          Course Player
        </a>
        <a className='link' href='./StudentPortal/Leaderboard.html'>
          Leaderboard
        </a>
        <a className='link' href='./StudentPortal/Quiz.html'>
          Quiz
        </a>
        <a className='link' href='./StudentPortal/StudentLogin.html'>
          StudentLogin
        </a>
        <a className='link' href='./StudentPortal/StudentReistration.html'>
          StudentRegistration
        </a>
      </div>
    </div>
  )
}
export default Student
