const IS_EDITING = 'books/isEditing'

const initialState = {}

export const setIsEditing = (book) => {
  return { type: IS_EDITING, payload: book }
}

export const editReducer = (state = initialState, action) => {
  if (action.type === IS_EDITING) {
    return { ...state, currentlyEditedBook: action.payload }
  }
  return state
}
