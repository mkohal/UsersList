import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const { users, setUsers } = useUserContext();
  const navigate = useNavigate();

  const existingUser = users.find((user) => user.id === Number(id)) || {
    first_name: "",
    last_name: "",
    email: "",
  };

  const [user, setUser] = useState(existingUser);

  useEffect(() => {
    if (!existingUser.first_name) {
      axios.get(`https://reqres.in/api/users/${id}`).then((res) => {
        setUser(res.data.data);
      });
    }
  }, [id, existingUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === Number(id) ? { ...u, ...user } : u))
      );
      toast.success("User data updated successfully!");
      navigate("/users");
    } catch (error) {
      toast.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit User
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all py-3 rounded-lg text-lg font-semibold text-white"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
