import React, { useState } from "react";

const ProductForm = ({ refreshProducts }) => {
  const [product, setProduct] = useState({
    product_name: "",
    quantity: "",
    category: "",
    expiry_date: "",
    buying_price: "",
    selling_price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          product_name: "",
          quantity: "",
          category: "",
          expiry_date: "",
          buying_price: "",
          selling_price: "",
        });
        refreshProducts();
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiry_date"
            value={product.expiry_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Buying Price
          </label>
          <input
            type="number"
            name="buying_price"
            value={product.buying_price}
            onChange={handleChange}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Selling Price
          </label>
          <input
            type="number"
            name="selling_price"
            value={product.selling_price}
            onChange={handleChange}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;