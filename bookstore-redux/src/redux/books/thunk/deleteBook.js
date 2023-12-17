import { deletedBook } from '../actions'
import axios from 'axios'
import { BASE_URL } from './axiosBase'

export const deleteBook = (bookId) => {
  return async (dispatch) => {
    await axios.delete(`${BASE_URL}/${bookId}`)
    dispatch(deletedBook(bookId))
  }
}
