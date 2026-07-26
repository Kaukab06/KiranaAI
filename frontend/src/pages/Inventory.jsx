import React from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const Inventory = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Inventory
      </h1>

      <ProductForm />

      <div className="mt-8">
        <ProductTable />
      </div>
    </div>
  );
};

export default Inventory;