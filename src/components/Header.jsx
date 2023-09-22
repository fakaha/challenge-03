import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Header = ({setRefresh}) => {

    const [task, setTask] = useState("");
    
    const addTask = () => {
      if(task !== ''){
        const newTask = {task, complete: false}
        
        fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        }).then(() => {
            setTask("");
            setRefresh(true)
            
            setTimeout(() => {
                alert('New task added');
            }, 500);
        });
      }else{
        alert('Todo tidak boleh kosong!!')
      }
    }

  return (
    <div className="header">
      <h2>TodoSearch</h2>

      <div className="search-add-button">
        {/* <button className="add-button" onClick={addTask}>Add New Task</button> */}
        <Link to="/newTodoPage"><Button>Add new Task</Button></Link>
      </div>
    </div>
  );
};
export default Header;
