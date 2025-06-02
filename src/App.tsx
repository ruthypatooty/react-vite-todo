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
        ...currentTodos, { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })
  }
  function toggleTodo(id, completed) {
    ;;;;;
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
                <label><input type="checkbox" checked={todo.completed} onClick={e => toggleTodo(todo.id, e.target} /> {todo.title}</label>
                <button className="btn btn-danger">Delerttt</button>

              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
