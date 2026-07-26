import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-white shadow rounded-lg p-5">
          <h3>Total Products</h3>
          <p className="text-3xl font-bold">120</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h3>Low Stock</h3>
          <p className="text-3xl font-bold text-red-500">7</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h3>Expiring Soon</h3>
          <p className="text-3xl font-bold text-orange-500">5</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h3>Estimated Loss</h3>
          <p className="text-3xl font-bold text-green-700">$42</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;