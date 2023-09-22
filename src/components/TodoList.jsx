import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { BsSearch } from "react-icons/bs";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [tasks, setTasks] = useState([]);

  // Untuk filter todo
  const [filter, setFilter] = useState("all");
  // Untuk search todo
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  useEffect(() => {
    if (isRefresh) {
      // Memanggil API untuk mengambil todos
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // Ketika rest API sukses, simpan data dari response ke state
          setTasks(data);
        })
        .catch((res) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const searchHandler = () => {
    if (query.length === 0) {
      setQueryResults([]);
      return;
    }
    setQueryResults(
      tasks.filter((todo) =>
        todo.task.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const results = queryResults.length !== 0 ? queryResults : tasks;

  // Untuk filter
  const filteredTodos =
    filter === "all"
      ? results
      : filter === "done"
      ? results.filter((todo) => todo.complete === true)
      : filter === "todo" && results.filter((todo) => todo.complete === false);

  return (
    <ul className="todo-list">
      <div className="searchInput">
        <input
        placeholder="Search todo"
          style={{ color: "black" }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span
          style={{ fontSize: "23px", backgroundColor: '#16A3B5', padding: '0 8px' }}
          onClick={searchHandler}
        >
          <BsSearch />
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="filterButtons">
          <button className="filterButton" onClick={() => setFilter("all")}>
            All
          </button>
          <button className="filterButton" onClick={() => setFilter("done")}>
            Done
          </button>
          <button className="filterButton" onClick={() => setFilter("todo")}>
            Todo
          </button>
        </div>
      </div>
      {filteredTodos.length === 0 ? (
        <h3>Empty data</h3>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        ))
      )}
    </ul>
  );
};

export default TodoList;
