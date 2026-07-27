import React, { useState } from "react";

const AIRecommendations = ({ summary }) => {
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/ai/recommendations");
      const data = await response.json();

      if (data.success) {
        setRecommendations(data.recommendations);
        setShowDetails(true);
      } else {
        alert("Failed to get recommendations: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-blue-900">🤖 AI Recommendations</h3>
          <p className="text-sm text-gray-600 mt-1">Get AI-powered insights for better inventory management</p>
        </div>
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          {loading ? "Analyzing... ⏳" : "Get Recommendations"}
        </button>
      </div>

      {summary && (
        <div className="grid grid-cols-4 gap-3 mb-4 text-sm">
          <div className="bg-white p-3 rounded">
            <p className="text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-blue-600">{summary.total_products}</p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="text-gray-600">Low Stock</p>
            <p className="text-2xl font-bold text-orange-600">{summary.low_stock_count}</p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="text-gray-600">Expiring Soon</p>
            <p className="text-2xl font-bold text-yellow-600">{summary.expiring_count}</p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="text-gray-600">Expired</p>
            <p className="text-2xl font-bold text-red-600">{summary.expired_count}</p>
          </div>
        </div>
      )}

      {showDetails && recommendations && (
        <div className="bg-white p-5 rounded-lg mt-4 border border-blue-200 max-h-96 overflow-y-auto">
          <h4 className="font-bold text-lg text-blue-900 mb-3">💡 AI Insights & Actions</h4>
          <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
            {recommendations}
          </div>
          <button
            onClick={() => setShowDetails(false)}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            ✕ Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
