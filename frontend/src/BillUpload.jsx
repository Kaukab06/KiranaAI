import React, { useState } from "react";

const BillUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedItems, setExtractedItems] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [editingItems, setEditingItems] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid image file (JPEG, PNG)");
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/bills/extract-ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setExtractedItems(data.items);
        setEditingItems(JSON.parse(JSON.stringify(data.items))); // Deep copy
        setShowPreview(true);
        alert(`✓ Extracted ${data.total_items} items from bill!`);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload bill");
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...editingItems];
    updated[index][field] = field === "price" || field === "quantity" ? parseFloat(value) : value;
    setEditingItems(updated);
  };

  const handleDeleteItem = (index) => {
    setEditingItems(editingItems.filter((_, i) => i !== index));
  };

  const handleAddToInventory = async () => {
    try {
      for (const item of editingItems) {
        const payload = {
          name: item.name,
          category: item.category,
          price: item.price,
          quantity: item.quantity,
          description: `Added from bill scan`,
          low_stock_threshold: 10,
        };

        const response = await fetch("http://localhost:8000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          alert(`Failed to add ${item.name}`);
          return;
        }
      }

      alert(`✓ Added ${editingItems.length} products to inventory!`);
      setShowPreview(false);
      setExtractedItems([]);
      setEditingItems([]);
      setFile(null);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add items");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">📸 Bill Upload & OCR</h2>

      {!showPreview ? (
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="bill-input"
            />
            <label htmlFor="bill-input" className="cursor-pointer">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-gray-600">
                {file ? file.name : "Click to upload bill image"}
              </p>
              <p className="text-sm text-gray-500 mt-2">PNG, JPEG (Max 10MB)</p>
            </label>
          </div>

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Processing... ⏳" : "Extract Items from Bill"}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-green-600">
            ✓ {editingItems.length} Items Extracted
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {editingItems.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded border">
                <div className="grid grid-cols-4 gap-3 mb-2">
                  <div>
                    <label className="text-xs font-bold text-gray-600">Product</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600">Category</label>
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleItemChange(index, "category", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600">Price</label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, "price", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600">Qty</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(index)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToInventory}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              ✓ Add All to Inventory
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillUpload;
