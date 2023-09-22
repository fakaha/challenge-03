import React, { useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";

const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedtask, setEditedtask] = useState(todo.task);

  const updateTask = () => {
    todo.complete = !todo.complete;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log("todo updated");
      setRefresh(true);
    });
  };

  const deleteTask = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("todo deleted.");
      setRefresh(true);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    todo.task = editedtask;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      setIsEditing(false);
      setRefresh(true);
    });
  };

  const handleEditCancel = () => {
    setEditedtask(todo.task);
    setIsEditing(false);
  };

  return (
    <li className={`${todo.complete ? "checked" : ""} listTodos`}>
      {todo.task}
      {isEditing ? (
        <div className="containerEdit">
          <input
          style={{color: 'black'}}
            type="text"
            value={editedtask}
            onChange={(e) => setEditedtask(e.target.value)}
          />
          <button
            onClick={() => {
              alert("Todo updated");
              handleEditSave();
            }}
          >
            Save
          </button>
          <button onClick={handleEditCancel}>Cancel</button>
        </div>
      ) : (
        <div className="handler-buttons">
          <input type="checkbox" onClick={updateTask} checked={todo.complete} />
          <BsPencilFill onClick={handleEdit}/>
          <BsFillTrash3Fill onClick={deleteTask} />
        </div>
      )}
      
    </li>
  );
};

export default TodoItem;
