import { thunk } from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { rootReducer } from './rootReducer'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
