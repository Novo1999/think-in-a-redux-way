import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../redux/books/thunk/addBook'
import EditBookForm from './EditBookForm'
import { useEffect } from 'react'

const Form = () => {
  const dispatch = useDispatch()

  const { currentlyEditedBook } = useSelector((state) => state.isEditing)
  console.log(currentlyEditedBook)

  const handleAddBook = (e) => {
    e.preventDefault()
    const newBook = {
      id: crypto.randomUUID(),
      name: e.target.name.value,
      author: e.target.author.value,
      thumbnail: e.target.thumbnail.value,
      price: +e.target.price.value,
      rating: +e.target.rating.value,
      featured: e.target.featured.checked,
    }
    dispatch(addBook(newBook))
  }

  useEffect(() => {
    if (currentlyEditedBook) {
      const form = document.querySelector('.book-form')

      form.elements.name.value = currentlyEditedBook.name || ''
      form.elements.author.value = currentlyEditedBook.author || ''
      form.elements.thumbnail.value = currentlyEditedBook.thumbnail || ''
      form.elements.price.value = currentlyEditedBook.price || ''
      form.elements.rating.value = currentlyEditedBook.rating || ''
      form.elements.featured.checked = currentlyEditedBook.featured || false
    }
  }, [currentlyEditedBook])

  return (
    <div>
      {currentlyEditedBook ? (
        <EditBookForm currentlyEditedBook={currentlyEditedBook} />
      ) : (
        <div className='p-4 overflow-hidden bg-white shadow-cardShadow rounded-md'>
          <h4 className='mb-8 text-xl font-bold text-center'>Add New Book</h4>
          <form onSubmit={handleAddBook} className='book-form'>
            <div className='space-y-2'>
              <label htmlFor='name'>Book Name</label>
              <input
                required=''
                className='text-input'
                type='text'
                id='input-Bookname'
                name='name'
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
                />
              </div>
            </div>
            <div className='flex items-center'>
              <input
                id='input-Bookfeatured'
                type='checkbox'
                name='featured'
                className='w-4 h-4'
              />
              <label htmlFor='featured' className='ml-2 text-sm'>
                {' '}
                This is a featured book{' '}
              </label>
            </div>
            <button type='submit' className='submit' id='submit'>
              Add Book
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
export default Form
