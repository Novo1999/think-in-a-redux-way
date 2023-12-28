const CourseContainer = ({ children }) => {
  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div className='grid grid-cols-3 gap-2 lg:gap-8'>{children}</div>
      </div>
    </section>
  )
}
export default CourseContainer
