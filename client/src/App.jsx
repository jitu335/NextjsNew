// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import AddEditUser from './components/AddEditUser';
import ProductList from './components/ProductList';
import AddEditProduct from './components/AddEditProduct';


const App = () => {
  // State and useEffect hooks
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  axios.defaults.baseURL = `http://localhost:5000`

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers(); // Fetch users after deleting a user
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(); // Fetch products after deleting a product
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div >
      <Router>
        <div >

          <h1>MERN Blog App</h1>

          <div >
            <div >
              <Link to="/"> 
                Home
              </Link>
            </div>
            <div >
              <Link to="/users">
                Users
              </Link>
            </div>
            <div>
              <Link to="/products" >
                Products
              </Link>
            </div>
          </div>
        </div>
        <div>

        <Routes>

          <Route path="/" element={'Please Navigate Around'} />
          <Route path="/users" element={<UserList users={users} fetchUsers={fetchUsers} deleteUser={deleteUser} />} />
          <Route path="/products" element={<ProductList products={products} fetchProducts={fetchProducts} deleteProduct={deleteProduct} />} />
          <Route path="/add-product" element={<AddEditProduct fetchProducts={fetchProducts} />} />
          <Route path="/add-user" element={<AddEditUser fetchUsers={fetchProducts} />} />
          <Route path="/edit-product/:id" element={<AddEditProduct fetchProducts={fetchProducts} />} />
          <Route path="/edit-user/:id" element={<AddEditUser fetchUsers={fetchProducts} />} />
        </Routes>
        </div>

      </Router>
    </div>
  );
};

export default App;
