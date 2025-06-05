import React from 'react'
import { Props } from './App'

interface TodoItemProps extends Props {
    toggleTodo: (id: string, completed: boolean) => void;
    deleteItem: (id: string) => void;
}
export function TodoItem({ completed, id, title, toggleTodo, deleteItem }: TodoItemProps) {
    return (
        <li>
            <label>
                <input type="checkbox" checked={completed}
                    onChange={e => {
                        let check = e.target as HTMLInputElement;
                        toggleTodo(id, check.checked);
                    }}
                /> {title}
            </label>
            <button
                onClick={e => deleteItem(id)}
                className="btn btn-danger">Delerttt</button>

        </li>)
}

