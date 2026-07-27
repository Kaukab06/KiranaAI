import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-green-700 text-white w-64 h-screen p-5">

      <h2 className="text-3xl font-bold mb-10">
        KiranaAI
      </h2>

      <ul className="space-y-6">

        <li className="cursor-pointer hover:text-yellow-300">
          Dashboard
        </li>

        <li className="cursor-pointer hover:text-yellow-300">
          Inventory
        </li>

        <li className="cursor-pointer hover:text-yellow-300">
          AI Assistant
        </li>

        <li className="cursor-pointer hover:text-yellow-300">
          Reports
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;