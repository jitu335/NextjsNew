// client/src/pages/AddEditProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProduct = ({ fetchProducts = null }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setName(response.data.data[0].name);
      setDescription(response.data.data[0].description);
      setPrice(response.data.data[0].price);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price: Number(price) };

    if (id) {
      try {
        await axios.put(`/api/products/${id}`, newProduct);
        navigate("/products");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      try {
        await axios.post("/api/products", newProduct);
        fetchProducts(); // Fetch products after adding a new product
        navigate("/products");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
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

export default AddEditProduct;
