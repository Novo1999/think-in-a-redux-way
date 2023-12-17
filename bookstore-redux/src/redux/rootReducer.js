import { combineReducers } from 'redux'
import { booksReducer } from './books/reducer'
import { editReducer } from './books/isEditing/isEditing'
export const rootReducer = combineReducers({
  books: booksReducer,
  isEditing: editReducer,
})
