// client/src/components/UserList.js
import React, { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const UserList = ({ users, deleteUser, fetchUsers }) => {
  const navigate = useNavigate();

  const editUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        <h2>User List</h2>
        <Link to="/add-user">Add User</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => editUser(user._id)}>Edit</button>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <td rowSpan={10} colSpan={10}>
              No Data Found
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
