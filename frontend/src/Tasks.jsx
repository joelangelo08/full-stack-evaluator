import { useEffect, useState } from 'react';
import api from "./api/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => {
        console.error("Failed to fetch tasks:", err);
        setError("Could not load tasks. Please try again later.");
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Tasks</h2>

      {/* Error handling */}
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (

        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <span className={`text-gray-700`}>
                {index+1}
              </span>
              <span className={`text-gray-700 ${task.isDone ? "line-through" : ""}`}>
                {task.title}
              </span>
              <span className={`text-xl ${task.isDone ? "text-green-500" : "text-red-400"}`}>
                {task.isDone ? "✅" : "❌"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
