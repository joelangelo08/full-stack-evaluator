import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "./api/tasks";
import { getUsers } from "./api/users";

function CreateTask() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Fetch the users first to get valid UserIds
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Could not load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const [formData, setFormData] = useState({
    title: "",
    isDone: false,
    userId: ""
  });
  
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userIdNumber = Number(formData.userId);

    // Validate the UserId input if allowed (from fetchUsers())
    const allowedUserIds = users.map(u => u.id);
    console.log(allowedUserIds);
    if (!allowedUserIds.includes(userIdNumber)) {
      setError("Invalid User ID. Please input a valid user.");
      setSuccess("");
      setLoading(false);
      return;
    }

    try {
      await createTask({
        title: formData.title,
        isDone: formData.isDone,
        userId: Number(formData.userId)
      });

      setSuccess("Task created successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create New Task
      </h2>

      {loading ? (
        // Loading spinner
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : success ? (
        <p className="mb-4 text-green-500 text-center">{success}</p>
      ) : error ? (
        <p className="mb-4 text-red-500 text-center">{error}</p>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
          required
        />

        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
          required
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isDone"
            checked={formData.isDone}
            onChange={handleChange}
          />
          <span>Completed</span>
        </label>

        <div className="flex justify-between items-center mt-8 gap-3">
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="w-[30%] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            <span className="text-white">Back</span>
          </button>

          <button
            type="submit"
            className="w-[70%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            <span className="text-white">Create Task</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;