import React, { useReducer } from 'react'

import TodosContext from './TodosContext'
import todosReducer from './todosReducer'

import { TodosInterface, TodoInterface } from '../../interfaces'
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, INIT_TODOS } from '../types'

const TodosState: React.FC = ({ children }) => {
  const initialState: TodosInterface = {
    todos: []
  }

  const [state, dispatch] = useReducer(todosReducer, initialState)

  const initTodos = (todos: TodoInterface[]): void => {
    dispatch({
      type: INIT_TODOS,
      payload: todos
    })
  }

  const addTodo = (todo: TodoInterface): void => {
    dispatch({
      type: ADD_TODO,
      payload: todo
    })
  }

  const removeTodo = (id: number): void => {
    const newTodos = state.todos.filter(todo => id !== todo.id)

    dispatch({
      type: REMOVE_TODO,
      payload: newTodos
    })
  }

  const toggleTodo = (id: number): void => {
    const newTodos = state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }

      return todo
    })

    dispatch({
      type: TOGGLE_TODO,
      payload: newTodos
    })
  }

  const { todos } = state

  return (
    <TodosContext.Provider
      value={{ todos, initTodos, addTodo, removeTodo, toggleTodo }}>
      {children}
    </TodosContext.Provider>
  )
}

export default TodosState
