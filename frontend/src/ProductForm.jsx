import React, { useState } from "react";

const ProductForm = () => {

  const [product, setProduct] = useState({
    product_name: "",
    quantity: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(product);

    alert("Product Added");

    setProduct({
      product_name: "",
      quantity: "",
      category: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow space-y-4"
    >

      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        className="border p-2 w-full"
        value={product.product_name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        className="border p-2 w-full"
        value={product.quantity}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        className="border p-2 w-full"
        value={product.category}
        onChange={handleChange}
      />

      <button
        className="bg-green-700 text-white px-5 py-2 rounded"
      >
        Add Product
      </button>

    </form>
  );
};

export default ProductForm;