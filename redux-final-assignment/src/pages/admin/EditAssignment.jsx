import EditFormAssignment from '../../components/EditFormAssignment'

export default function EditAssignment() {
  return (
    <div
      style={{ marginTop: '50px' }}
      className='max-w-7xl mx-auto px-5 lg:px-0'
    >
      <div className='w-full'>
        <div className='px-4 sm:px-0 pb-4'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Edit assignment
          </h3>
          <p className='mt-1 text-sm text-gray-600'>
            Please fillup the form to edit assignment
          </p>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <EditFormAssignment />
        </div>
      </div>
    </div>
  )
}
