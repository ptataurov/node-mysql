import React, { useContext } from 'react'
import './TodoList.scss'
import { TodoInterface, TodosInterface } from '../../interfaces'
import TodosContext from '../../context/Todos/TodosContext'

type TodoListProps = {
  todos: TodoInterface[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({
  // todos,
  onToggle,
  onRemove
}) => {
  const { todos }: TodosInterface = useContext(TodosContext)

  if (todos.length === 0) {
    return <p className="center flow-text">Задач нет</p>
  }

  return (
    <ul className="todo-list">
      {todos.map(({ id, completed, title }) => {
        const completedClass = completed ? 'completed' : ''

        return (
          <li className={`todo grey lighten-3 ${completedClass}`} key={id}>
            <label>
              <input
                type="checkbox"
                checked={completed}
                onClick={() => onToggle(id)}
              />
              <span>{title}</span>
              <i
                className="material-icons red-text"
                onClick={() => onRemove(id)}>
                delete
              </i>
            </label>
          </li>
        )
      })}
    </ul>
  )
}
