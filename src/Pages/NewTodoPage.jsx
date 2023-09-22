import React, {useState} from 'react'
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const NewTodoPage = () => {

    const [task, settask] = useState('');

    // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
    const addTodo = () => {
        if(task !== ''){
      const newTodo = { task, complete: false };
  
      fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      }).then(() => {
        alert('Todo added')
        // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
        settask('');
      });
    }else{
        alert('Todo tidak boleh kosong!')
    }
    };

  return (
    <div>
        <div className="container">
            <h2>Add Todo</h2>
            <div className="inputButton" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <input type="text" value={task} onChange={(e) => settask(e.target.value)} placeholder='Add todo' style={{color: 'black'}}/>
            <BsFillPlusCircleFill style={{color: '#16A3B5'}} onClick={() => {addTodo();}}/>
            </div>
        </div>
        <div className="backButton">
            <Link to='/'>Kembali</Link>
        </div>
    </div>
  )
}

export default NewTodoPage;