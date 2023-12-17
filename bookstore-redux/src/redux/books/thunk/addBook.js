import axios from 'axios'
import { addedBook } from '../actions'
import { BASE_URL } from './axiosBase'

export const addBook = (book) => {
  return async (dispatch) => {
    await axios.post(BASE_URL, book)
    dispatch(addedBook(book))
  }
}
