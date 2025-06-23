import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import TodoForm from './TodoForm';
import { TodoList } from './TodoList';

export interface Props {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define backend URL
const API_BASE_URL = 'http://localhost:3001/api/todos';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Props[]>([]);

  const fetchTodos = useCallback(async()=>{
    setLoading(true);
    setError(null);
    try{
      const res = await fetch(API_BASE_URL);
      if(!res.ok){
        throw new Error(`http error! ${res.status}`);
      }

      const data: Props[] = await res.json();
      setTodos(data.map(todo =>({...todo, id: String(todo.id)})));

    }catch(error){
      console.error("failed to fetchtodos", error);
      setError("failed to fetchtodos");
    }finally{
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos])

  const addTodo = useCallback(async (title: string)=>{
    try{
      const res = await fetch(API_BASE_URL,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({title}),
      })
      if(!res.ok){
        throw new Error(`error here addtodo ${res.status}`);
      }
      
      const newTodo: Props = await res.json();
      setTodos(currentTodo =>[{
        ...newTodo,
        id:String(newTodo.id)},
        ...currentTodo
      ])
    }catch(error){
      console.error(`error in addtodo ${Response}`);
    }finally{
      setLoading(false);
    }
  },[]);

  const toogleTodo = useCallback(async(id:string, completed:boolean)=>{
    try{
      const response = await fetch(`${API_BASE_URL}/${id}`, { // Note the /:id in the URL
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedTodo: Props = await response.json();
            setTodos(currentTodos =>
                currentTodos.map(todo =>
                    todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );
    }catch(error){
      console.error('error in toggletodo');
    }
  },[]);

  const deleteItem = useCallback(async(id:string)=>{
    try{
      const response = await fetch(`${API_BASE_URL}/${id}`, { // Note the /:id in the URL
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    }catch(error){
      console.error("error in deleteitem");
    }
  },[]);
  return (
    <>
      <TodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      {loading && <p>Loading todos..</p>}
      {error && <p className='error'>{error}</p>}
      {!loading && !error && (
        <TodoList todos={todos} toggleTodo={toogleTodo} deleteItem={deleteItem} />
      )}
    </>
  );
}

export default App
