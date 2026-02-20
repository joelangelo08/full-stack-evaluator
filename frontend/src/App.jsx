import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./Tasks"
import CreateTask from "./CreateTask";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <h1>📝 React Task Evaluator</h1>
    
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />

        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/create" element={<CreateTask />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App
