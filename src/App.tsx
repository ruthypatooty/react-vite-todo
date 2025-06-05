import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import TodoForm from './TodoForm';
import { TodoList } from './TodoList';

export interface Props {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Props[]>(() => {
    const localVal = localStorage.getItem("TODOS")
    if (localVal == null) return []

    return JSON.parse(localVal);
  });

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title: string) {
    setTodos(currentTodos => {
      return [
        ...currentTodos, { id: crypto.randomUUID(), title, completed: false }
      ]
    })
  }

  function toggleTodo(id: string, completed: boolean) {
    setTodos(currentTodos => {
      return (currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo;
      }))
    })
  }

  function deleteItem(id: string) {
    setTodos(currentTodos => {
      return currentTodos.filter(e => e.id !== id)
    });
  }
  return (
    <>
      <div className="App">
        < TodoForm onSubmit={addTodo} />
        <h1 className="header">ToDo List</h1>
        < TodoList todos={todos} toggleTodo={toggleTodo} deleteItem={deleteItem} />
      </div>
    </>
  )
}

export default App
