const EditBookForm = ({ currentlyEditedBook }) => {
  const { name, author, thumbnail, price, rating, featured, id } =
    currentlyEditedBook
  const handleEditBook = () => {}

  return (
    <div className='p-4 overflow-hidden bg-white shadow-cardShadow rounded-md'>
      <h4 className='mb-8 text-xl font-bold text-center'>Edit Book</h4>
      <form onSubmit={handleEditBook} className='book-form'>
        <div className='space-y-2'>
          <label htmlFor='name'>Book Name</label>
          <input
            required=''
            className='text-input'
            type='text'
            id='input-Bookname'
            name='name'
            defaultValue={name}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='category'>Author</label>
          <input
            required=''
            className='text-input'
            type='text'
            id='input-Bookauthor'
            name='author'
            defaultValue={author}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='image'>Image Url</label>
          <input
            required=''
            className='text-input'
            type='text'
            id='input-Bookthumbnail'
            name='thumbnail'
            defaultValue={thumbnail}
          />
        </div>
        <div className='grid grid-cols-2 gap-8 pb-4'>
          <div className='space-y-2'>
            <label htmlFor='price'>Price</label>
            <input
              required=''
              className='text-input'
              type='number'
              id='input-Bookprice'
              name='price'
              defaultValue={price}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='quantity'>Rating</label>
            <input
              required=''
              className='text-input'
              type='number'
              id='input-Bookrating'
              name='rating'
              min={1}
              max={5}
              defaultValue={rating}
            />
          </div>
        </div>
        <div className='flex items-center'>
          <input
            id='input-Bookfeatured'
            type='checkbox'
            name='featured'
            className='w-4 h-4'
            defaultChecked={featured}
          />
          <label htmlFor='featured' className='ml-2 text-sm'>
            {' '}
            This is a featured book{' '}
          </label>
        </div>
        <button type='submit' className='submit' id='submit'>
          Edit Book
        </button>
      </form>
    </div>
  )
}
export default EditBookForm
