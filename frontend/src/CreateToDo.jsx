import React, { useState, useEffect } from 'react'
import './hard75.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs'; // Import the icons

function CreateToDo() {
    const { loggedInUserId } = useParams();
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);

    // Fetch To-Dos for the user
    useEffect(() => {
        axios.get(`http://localhost:8081/todos/${loggedInUserId}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, [loggedInUserId]);

    const handleAdd = () => {
        console.log('loggedInUserId:', loggedInUserId);
        console.log('task:', task);
        if (loggedInUserId && task) {
            axios.post('http://localhost:8081/hard-75', { user_id: loggedInUserId, task })
                .then(result => {
                    console.log(result);
                    setTodos([...todos, { task, task_id: result.data.task_id }]);
                    setTask('');
                })
                .catch(err => console.log(err));
        } else {
            console.error('User ID or Task is missing');
        }
    };

    const handleDelete = (todoId) => {
        axios.delete(`http://localhost:8081/todos/${todoId}`)
            .then(response => {
                setTodos(todos.filter(todo => todo.task_id !== todoId));
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        axios.put(`http://localhost:8081/todos/${loggedInUserId}/update/${id}`)
        .then(result => {
            // Update the UI to reflect the change
            setTodos(todos.map(todo =>
                todo.task_id === id ? { ...todo, done: true } : todo
            ));
        })
        .catch(error => console.log(error));
}

return (
        <div className='home'>
            <div className='create_form'>
                <h2>Hard75 ToDo List:</h2>
                <div>
                    <input type="text" placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)} />
                    <button type="button" onClick={handleAdd}>Add</button>
                </div>
            </div>
                <ul>
                    {todos.map(todo => (
                        <li className='task' key={todo.task_id}>
                            <div className='checkbox' onClick={() => handleEdit(todo.task_id)}>
                                {todo.done ?
                                    <BsFillCheckCircleFill className='icon' />
                                    : <BsCircleFill className='icon' />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <BsFillTrashFill className='icon' onClick={() => handleDelete(todo.task_id)} />
                        </li>
                    ))}
                </ul>
        </div>
        
    );
}

export default CreateToDo;