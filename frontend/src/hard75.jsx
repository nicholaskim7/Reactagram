import React, { useState } from 'react';
import CreateToDo from './CreateToDo';
import './hard75.css';

function hard75() {
    const [todos, setTodos] = useState([])
  return (
    <div className='home'>
        <h2>Todo List:</h2>
        <CreateToDo/>
        {
            todos.length === 0 
            ?
            <div><h2>No Record</h2></div>
            :
            todos.map(todo => (
                <div>
                    {todo}
                </div>
            ))
        }
    </div>
  )
}

export default hard75