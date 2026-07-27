import React, { useEffect, useState } from "react";

import ProductForm from "../ProductForm";
import ProductTable from "../ProductTable";
import BillUpload from "../BillUpload";
import AIRecommendations from "../AIRecommendations";
import HelpPanel from "../HelpPanel";
import HelpButton from "../HelpButton";


const Dashboard = () => {


  const [products, setProducts] = useState([]);
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [stockStatus, setStockStatus] = useState(null);
  const [showHelp, setShowHelp] = useState(false);



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

  // Fetch expiring products
  const fetchExpiringProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/products/expiring-soon?days=7"
      );
      const data = await response.json();
      setExpiringProducts(data);
    } catch(error) {
      console.log("Error fetching expiring products:", error);
    }
  };

  // Fetch expired products
  const fetchExpiredProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/products/expired"
      );
      const data = await response.json();
      setExpiredProducts(data);
    } catch(error) {
      console.log("Error fetching expired products:", error);
    }
  };

  // Fetch low stock products
  const fetchLowStockProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/products/low-stock-alerts"
      );
      const data = await response.json();
      setLowStockProducts(data);
    } catch(error) {
      console.log("Error fetching low stock products:", error);
    }
  };

  // Fetch stock status
  const fetchStockStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/products/stock-status"
      );
      const data = await response.json();
      setStockStatus(data);
    } catch(error) {
      console.log("Error fetching stock status:", error);
    }
  };



  // Load products when dashboard opens
  useEffect(() => {

    fetchProducts();
    fetchExpiringProducts();
    fetchExpiredProducts();
    fetchLowStockProducts();
    fetchStockStatus();

    // Add keyboard shortcut for help (?)
    const handleKeyPress = (e) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowHelp(!showHelp);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);

  }, [showHelp]);




  // Calculate dashboard values

  const totalProducts = products.length;



  const lowStock = lowStockProducts.length;
  const outOfStock = stockStatus?.out_of_stock_count || 0;



  const expiringCount = expiringProducts.length;
  const expiredCount = expiredProducts.length;



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
            Out of Stock
          </h3>

          <p className="text-3xl font-bold text-red-700">
            {outOfStock}
          </p>

        </div>




        <div className="bg-white shadow rounded-lg p-5">

          <h3>
            Expiring Soon (7 days)
          </h3>

          <p className="text-3xl font-bold text-orange-500">
            {expiringCount}
          </p>

        </div>


      </div>

      {expiredCount > 0 && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">⚠️ Warning: {expiredCount} product(s) have expired!</p>
        </div>
      )}

      {expiringCount > 0 && (
        <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p className="font-bold">⏰ Alert: {expiringCount} product(s) expiring soon!</p>
        </div>
      )}

      {lowStock > 0 && (
        <div className="mt-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
          <p className="font-bold">📦 Restock Alert: {lowStock} product(s) below threshold!</p>
        </div>
      )}

      {outOfStock > 0 && (
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">🚨 Critical: {outOfStock} product(s) out of stock!</p>
        </div>
      )}

      <div className="mt-10">
        <AIRecommendations 
          summary={{
            total_products: totalProducts,
            low_stock_count: lowStock,
            expiring_count: expiringCount,
            expired_count: expiredCount
          }}
        />
      </div>




      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Add Product
        </h2>


        <ProductForm 
          refreshProducts={async () => {
            await fetchProducts();
            await fetchExpiringProducts();
            await fetchExpiredProducts();
            await fetchLowStockProducts();
            await fetchStockStatus();
          }}
        />


      </div>

      <div className="mt-10">

        <BillUpload 
          onSuccess={async () => {
            await fetchProducts();
            await fetchExpiringProducts();
            await fetchExpiredProducts();
            await fetchLowStockProducts();
            await fetchStockStatus();
          }}
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

      <HelpButton onClick={() => setShowHelp(true)} />
      
      {showHelp && (
        <HelpPanel isOpen={showHelp} onClose={() => setShowHelp(false)} />
      )}




    </div>

  );

};


export default Dashboard;