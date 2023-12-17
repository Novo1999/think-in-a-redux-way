import { loadBooks } from '../actions'
import axios from 'axios'
import { BASE_URL } from './axiosBase'

export const getBooks = async (dispatch) => {
  const { data } = await axios.get(BASE_URL)

  dispatch(loadBooks(data))
}
