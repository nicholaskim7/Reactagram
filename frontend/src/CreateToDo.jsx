import React, { useState, useEffect } from 'react'
import './hard75.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs'; // Import the icons
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';

function CreateToDo() {
    const { loggedInUserId } = useParams();
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

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

    const handleInfo = () => {
        setShowInfo(true);
    };

    const handleClose = () => {
        setShowInfo(false);
    };


return (
        <div className='home'>
            <h2>75-Hard ToDo List:</h2>
            <Button onClick={handleInfo}>more info</Button>
            <h6>Your task completion will be displayed on your public profile. Don't fall behind your friends.</h6>

            <Modal show={showInfo} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>75 Hard Challenge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Rules of the 75 Hard:</h5>
                    <h6>- Follow a structured diet</h6>
                    <h6>- Complete two 45-minute workouts, one of which must be outdoors</h6>
                    <h6>- Drink 1 gallon of water per day</h6>
                    <h6>- Read 10 pages of a non-fiction book</h6>
                    <h5>This is a guideline. Add more personalized tasks to your heart's content.</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='create_form'>
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