import { useEffect } from 'react'
import Card from './Card'
import Tabs from './Tabs'
import { useSelector, useDispatch } from 'react-redux'
import { getBooks } from '../redux/books/thunk/getBooks'

const BookContainer = () => {
  const books = useSelector((state) => state.books)
  const dispatch = useDispatch()

  console.log(books)

  useEffect(() => {
    dispatch(getBooks)
  }, [dispatch])

  return (
    <div className='order-2 xl:-order-1'>
      <Tabs />
      <div className='lws-bookContainer'>
        {books.map((book) => {
          return <Card key={book.id} book={book} />
        })}
      </div>
    </div>
  )
}
export default BookContainer
