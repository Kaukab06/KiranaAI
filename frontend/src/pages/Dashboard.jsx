import React, { useEffect, useState } from "react";

import ProductForm from "../ProductForm";
import ProductTable from "../ProductTable";


const Dashboard = () => {


  const [products, setProducts] = useState([]);



  // Fetch products from backend
  const fetchProducts = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/products"
      );


      const data = await response.json();


      setProducts(data);


    } catch(error) {

      console.log(error);

    }

  };



  // Load products when dashboard opens
  useEffect(() => {

    fetchProducts();

  }, []);




  // Calculate dashboard values

  const totalProducts = products.length;



  const lowStock = products.filter(
    (item)=> item.quantity < 10
  ).length;



  const expiringSoon = products.filter(
    (item)=> item.expiry_date
  ).length;



  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>



      <div className="grid grid-cols-4 gap-5">


        <div className="bg-white shadow rounded-lg p-5">

          <h3>
            Total Products
          </h3>

          <p className="text-3xl font-bold">
            {totalProducts}
          </p>

        </div>



        <div className="bg-white shadow rounded-lg p-5">

          <h3>
            Low Stock
          </h3>

          <p className="text-3xl font-bold text-red-500">
            {lowStock}
          </p>

        </div>




        <div className="bg-white shadow rounded-lg p-5">

          <h3>
            Expiring Soon
          </h3>

          <p className="text-3xl font-bold text-orange-500">
            {expiringSoon}
          </p>

        </div>




        <div className="bg-white shadow rounded-lg p-5">

          <h3>
            Estimated Loss
          </h3>

          <p className="text-3xl font-bold text-green-700">
            $42
          </p>

        </div>


      </div>




      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Add Product
        </h2>


        <ProductForm 
          refreshProducts={fetchProducts}
        />


      </div>




      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Product Inventory
        </h2>


        <ProductTable 
          products={products}
        />


      </div>




    </div>

  );

};


export default Dashboard;