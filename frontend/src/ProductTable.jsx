import React from "react";

const ProductTable = ({ products }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Product deleted successfully!");
          window.location.reload();
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting product");
      }
    }
  };

  return (
    <table className="table-auto w-full border mt-5">
      <thead className="bg-green-700 text-white">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Expiry Date</th>
          <th>Buying Price</th>
          <th>Selling Price</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((item) => (
          <tr key={item.id} className="text-center border">
            <td className="px-4 py-2">{item.id}</td>
            <td className="px-4 py-2">{item.product_name}</td>
            <td className="px-4 py-2">{item.quantity}</td>
            <td className="px-4 py-2">{item.category}</td>
            <td className="px-4 py-2">
              {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : "-"}
            </td>
            <td className="px-4 py-2">
              ${item.buying_price ? item.buying_price.toFixed(2) : "-"}
            </td>
            <td className="px-4 py-2">
              ${item.selling_price ? item.selling_price.toFixed(2) : "-"}
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;