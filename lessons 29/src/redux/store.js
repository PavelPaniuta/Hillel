import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import todosReducer from './slices/todoSlice'

export default configureStore({
  reducer: {
    counter: counterReducer, 
    todos: todosReducer,    
  }
})