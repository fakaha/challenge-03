import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';

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
      <div className="search-input">
        {/* <input type="text" placeholder="Add todo" value={task} onChange={(e) => setTask(e.target.value)}/> */}
      </div>

      <div className="search-add-button">
        {/* <button className="search-button">Search</button> */}
        {/* <button className="add-button" onClick={addTask}>Add New Task</button> */}
        <Link to="/newTodoPage"><h2 style={{fontSize: '30px', padding: '10px', backgroundColor: '#16A3B5', borderRadius: '18px', color: 'white'}}>Add new Task</h2></Link>
      </div>
    </div>
  );
};
export default Header;
