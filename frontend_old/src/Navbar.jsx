import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-700">
        KiranaAI
      </h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search Product..."
          className="border rounded-lg px-3 py-2"
        />

        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
