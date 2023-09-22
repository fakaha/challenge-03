import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import NewTodoPage from "./Pages/NewTodoPage";

function App() {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };

  return (
    
      <div className="App">
        <div className="content">
          <Header setRefresh={setRefresh} />
          <TodoList setRefresh={setRefresh} isRefresh={isRefresh} />
        </div>
      </div>
      
  );
}

export default App;