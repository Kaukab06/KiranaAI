import React from "react";

const HelpButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      title="Open Help & Guide (Keyboard: ?)"
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all text-2xl z-40"
    >
      ❓
    </button>
  );
};

export default HelpButton;
