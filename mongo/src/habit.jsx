import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, Plus } from "lucide-react";

const Habit = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data1, setData1] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/records");
      const data = response.data;
      setData1(data.filter((el) => el.isDeleted == false));
    } catch (e) {
      console.log(e);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/records/save", {
        name,
        title,
        description,
      });
      fetchdata();
      setName("");
      setTitle("");
      setDescription("");
    } catch (e) {
      console.log(e);
    }
  };

  const deletehabit = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/records/${id}/soft-delete`, {
        isDeleted: true,
      });
      fetchdata();
    } catch (e) {
      console.log(e);
    }
  };

  const updatehabit = async (id) => {
    const updateName = prompt("Enter new name");
    const updateTitle = prompt("Enter new title");
    const updateDes = prompt("Enter new description");

    if (updateTitle && updateName && updateDes) {
      try {
        await axios.put(`http://localhost:3000/api/records/${id}`, {
          name: updateName,
          title: updateTitle,
          description: updateDes,
        });
        fetchdata();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const title2 = ["a", "b", "c"];

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Habit Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
            Add New Habit
          </h2>
          <form onSubmit={handlesubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Habit
              </label>
              <select
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Choose habit</option>
                {title2.map((habit) => (
                  <option key={habit} value={habit}>
                    {habit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="des"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="des"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <Plus className="mr-2" size={20} />
              Add Habit
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
            Your Habits
          </h2>
          <div className="space-y-4">
            {data1.map((party) => (
              <div key={party._id} className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {party.name}
                </h3>
                <p className="text-indigo-600 font-medium">{party.title}</p>
                <p className="text-gray-600 mt-1">{party.description}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors duration-300 flex items-center"
                    onClick={() => deletehabit(party._id)}
                  >
                    <Trash2 className="mr-1" size={16} />
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition-colors duration-300 flex items-center"
                    onClick={() => updatehabit(party._id)}
                  >
                    <Edit className="mr-1" size={16} />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habit;
