// client/src/components/ProductList.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = ({ products, deleteProduct, fetchProducts }) => {
  const navigate = useNavigate();

  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <h2>Product List</h2>
        <Link to="/add-product">Add Product</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.length ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => editProduct(product._id)}>Edit</button>
                  <button onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
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

export default ProductList;
