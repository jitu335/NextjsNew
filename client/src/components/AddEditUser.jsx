// client/src/pages/AddEditUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

const AddEditUser = ({ fetchUsers }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (id) {
      console.log("here");
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setname(response.data.data[0].name);
      setEmail(response.data.data[0].email);
      setPassword(response.data.data[0].password);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };

    if (id) {
      try {
        await axios.put(`/api/users/${id}`, newUser);
        navigate("/users");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        await axios.post("/api/users", newUser);
        fetchUsers(); // Fetch users after adding a new user
        navigate("/users");
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <div>
      <h2> {id ? "Edit" : "Add"} User</h2>
      <form onSubmit={handleSubmit}>
        <div >
          <input
            placeholder="name" 
            id="name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div >
      
          <input
            placeholder="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div >
       
          <input
           placeholder="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddEditUser;
