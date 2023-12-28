const PortalContainer = ({ children }) => {
  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0 '>
        <h1 className='text-4xl font-bold my-4 text-center'>
          You can go to other pages from here
        </h1>
        <div className='grid grid-cols-2 gap-5 mt-8'>{children}</div>
      </div>
    </section>
  )
}
export default PortalContainer
