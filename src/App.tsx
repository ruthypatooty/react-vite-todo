import { useState } from 'react'
import reactLogo from './assets/react.svg'

interface Props {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState<Props[]>([]);

  function handleSubmit(e: any) {
    e.preventDefault();

    setTodos(currentTodos => {
      return [
        ...currentTodos, { id: crypto.randomUUID(), title: newItem, completed: false }
      ]
    })
    setNewItem("")
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
        <form onSubmit={handleSubmit} className="new-item-form">
          <div className="form-row">
            <label htmlFor="item">New Item</label>
            <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="text"></input>
          </div>
          <button className="btn">Add</button>
        </form>
        <h1 className="header">Todo List</h1>
        <ul >
          {todos.map(todo => {
            return (
              <li key={todo.id}>
                <label>
                  <input type="checkbox" checked={todo.completed} onChange={e => {
                    let check = e.target as HTMLInputElement;
                    toggleTodo(todo.id, check.checked);
                  }} /> {todo.title}
                </label>
                <button onClick={e => deleteItem(todo.id)} className="btn btn-danger">Delerttt</button>

              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
