import React, { useState } from "react";

const HelpPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const helpContent = {
    overview: {
      title: "Dashboard Overview",
      content: [
        {
          title: "📊 Dashboard Cards",
          description: "Quick stats showing inventory health at a glance"
        },
        {
          title: "🚨 Alert System",
          description: "Color-coded alerts for low stock, expired items, and restocking needs"
        },
        {
          title: "📦 Inventory Management",
          description: "Add, edit, and track all your store products"
        },
        {
          title: "📸 Bill Scanner",
          description: "Upload bill photos to auto-extract products using AI"
        },
        {
          title: "🤖 AI Assistant",
          description: "Get intelligent recommendations for inventory optimization"
        }
      ]
    },
    features: {
      title: "Feature Guide",
      content: [
        {
          title: "Total Products",
          description: "Shows the total number of unique products in your inventory. Use this to track diversity."
        },
        {
          title: "Low Stock",
          description: "Products below their threshold. Set custom thresholds per product for better control."
        },
        {
          title: "Out of Stock",
          description: "Products with zero quantity. Priority for restocking."
        },
        {
          title: "Expiring Soon",
          description: "Products expiring within 7 days. Consider promotions to clear them quickly."
        },
        {
          title: "Add Product",
          description: "Manually add products with name, price, quantity, and expiry date. Set a low stock threshold."
        },
        {
          title: "Bill Upload",
          description: "Upload a bill/receipt image. OCR extracts items automatically. Review and add in bulk."
        },
        {
          title: "AI Recommendations",
          description: "Click 'Get Recommendations' for AI-powered insights on pricing, stocking, and sales."
        }
      ]
    },
    tips: {
      title: "Pro Tips",
      content: [
        {
          title: "💡 Restocking Strategy",
          description: "Always set low stock thresholds based on your supplier lead time."
        },
        {
          title: "💡 Price Optimization",
          description: "Use AI recommendations to identify products you can price higher."
        },
        {
          title: "💡 Expiry Management",
          description: "Mark items expiring soon with promotional prices to reduce waste."
        },
        {
          title: "💡 Bill Upload",
          description: "Take clear photos of bills with good lighting for better OCR accuracy."
        },
        {
          title: "💡 Category Organization",
          description: "Use consistent category names for better inventory organization and AI analysis."
        },
        {
          title: "💡 Regular Audits",
          description: "Compare physical inventory with system data weekly to maintain accuracy."
        }
      ]
    },
    shortcuts: {
      title: "Quick Tips",
      content: [
        {
          title: "🔄 Refresh Alerts",
          description: "Alerts update automatically. Changes appear instantly when items are added/modified."
        },
        {
          title: "🔍 Find Products",
          description: "Use the search feature to quickly locate products by name or category."
        },
        {
          title: "✏️ Bulk Edit",
          description: "Click on any product in the table to view/edit its details including expiry date."
        },
        {
          title: "📊 Export Data",
          description: "Use browser's 'Print to PDF' for inventory reports and backups."
        }
      ]
    }
  };

  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-semibold rounded-t-lg transition ${
        activeTab === tab
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:w-3/4 lg:w-2/3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">📖 KiranaAI Help & Guide</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200 flex overflow-x-auto">
            <TabButton tab="overview" label="📊 Overview" />
            <TabButton tab="features" label="✨ Features" />
            <TabButton tab="tips" label="💡 Pro Tips" />
            <TabButton tab="shortcuts" label="⚡ Quick Tips" />
          </div>

          <div className="px-6 py-6 bg-gray-50 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {helpContent[activeTab].title}
            </h3>

            <div className="space-y-4">
              {helpContent[activeTab].content.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 px-6 py-4 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto"
            >
              Got it! Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;
