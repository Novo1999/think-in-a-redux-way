import { ADDED, DELETED, LOADED_BOOKS } from './actionTypes'
import { initialState } from './initialState'

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED_BOOKS:
      return action.payload
    case ADDED:
      return [...state, action.payload]
    case DELETED:
      return state.filter((book) => book.id !== action.payload)
    default:
      return state
  }
}
