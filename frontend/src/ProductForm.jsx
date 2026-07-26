import React, { useState } from "react";

const ProductForm = ({ refreshProducts }) => {
  const [product, setProduct] = useState({
    product_name: "",
    quantity: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // your fetch code here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs */}
    </form>
  );
};

export default ProductForm;