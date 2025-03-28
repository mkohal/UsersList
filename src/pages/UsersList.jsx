import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserContext } from "../context/UserContext";


const UsersList = () => {
  const { users, setUsers } = useUserContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users`);
        setUsers(response.data.data);
      } catch (error) {
        toast.error("Error fetching users:", error);
      }
    };

    if (users.length === 0) fetchUsers();
  }, [setUsers]);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully!");
  };


  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg shadow-md mb-4">
        <h2 className="text-3xl font-semibold">Users List</h2>
      </div>

      <div className="hidden md:block bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-sm md:text-base">
              <th className="p-4 text-left">Avatar</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b transition hover:bg-gray-100"
              >
                <td className="p-4">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                  />
                </td>
                <td className="font-medium text-gray-700 p-4">
                  {user.first_name} {user.last_name}
                </td>
                <td className="text-gray-600 p-4">{user.email}</td>
                <td className="p-4 flex justify-center space-x-3">
                  <button
                    onClick={() => navigate(`/edit/${user.id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/edit/${user.id}`)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}


        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;