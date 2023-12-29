import Form from '../../components/Form'
import FormAssignment from '../../components/FormAssignment'

export default function AddAssignment() {
  return (
    <div
      style={{ marginTop: '50px' }}
      className='max-w-7xl mx-auto px-5 lg:px-0'
    >
      <div className='w-full'>
        <div className='px-4 sm:px-0 pb-4'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Add new assignment
          </h3>
          <p className='mt-1 text-sm text-gray-600'>
            Please fillup the form to add new assignment
          </p>
        </div>
        <div className='mt-5 md:mt-0 md:col-span-2'>
          <FormAssignment />
        </div>
      </div>
    </div>
  )
}
