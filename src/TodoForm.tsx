import React, { useState } from 'react'
import { Props } from './App'

interface AddProps {
    onSubmit: (title: string) => void;

}
const TodoForm = (props: AddProps) => {
    const [newItem, setNewItem] = useState("")
    const [todos, setTodos] = useState<Props[]>([]);

    function handleSubmit(e: any) {
        e.preventDefault();
        if (newItem == "") return

        props.onSubmit(newItem)

        setNewItem("")
    }
    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="text"></input>
            </div>
            <button className="btn">Add</button>
        </form>)
}

export default TodoForm