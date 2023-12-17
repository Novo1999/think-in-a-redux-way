import { ADDED, DELETED, LOADED_BOOKS } from './actionTypes'

export const loadBooks = (books) => {
  return { type: LOADED_BOOKS, payload: books }
}

export const addedBook = (book) => {
  return { type: ADDED, payload: book }
}

export const deletedBook = (bookId) => {
  return { type: DELETED, payload: bookId }
}
