import { Props } from "./App";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
    todos: Props[];
    toggleTodo: (id: string, completed: boolean) => void;
    deleteItem: (id: string) => void;
}

export function TodoList({ todos, toggleTodo, deleteItem }: TodoListProps) {
    return (
        <ul >
            {todos.length === 0 && "No ToDos"}
            {todos.map(todo => {
                return (
                    <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteItem={deleteItem} />
                )
            })}
        </ul>
    )
}

