import React from "react";

const ProductTable = ({ products }) => {
  return (
    <table className="table-auto w-full border mt-5">
      <thead className="bg-green-700 text-white">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
      </thead>

      <tbody>
        {products.map((item) => (
          <tr key={item.id} className="text-center border">
            <td>{item.id}</td>
            <td>{item.product_name}</td>
            <td>{item.quantity}</td>
            <td>{item.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;