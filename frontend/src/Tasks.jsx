import { useEffect, useState } from 'react';
import api from "./api/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => {
        console.error("Failed to fetch tasks:", err);
        setError("Could not load tasks. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Tasks</h2>

      {loading ? (
        // Loading spinner
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        // Error handling
        <p className="text-center text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
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
