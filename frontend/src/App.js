import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5252/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", sku: "", quantity: "" });

  // FIXED: store full item
  const [editingItem, setEditingItem] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    sku: "",
    quantity: "",
  });

  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ADD
  const addItem = async (e) => {
    e.preventDefault();

    if (!form.name || !form.sku || form.quantity === "") {
      alert("All fields required");
      return;
    }

    await axios.post(API, {
      ...form,
      quantity: Number(form.quantity),
    });

    setForm({ name: "", sku: "", quantity: "" });
    fetchItems();
  };

  // DELETE
  const deleteItem = async (sku) => {
    if (!window.confirm("Delete this item?")) return;

    await axios.delete(`${API}/${sku}`);
    fetchItems();
  };

  // START EDIT
  const startEdit = (item) => {
    setEditingItem(item); // store full item
    setEditForm({
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
    });
  };

  // UPDATE (FIXED)
  const updateItem = async () => {
    if (!editForm.name || !editForm.sku || editForm.quantity === "") {
      alert("All fields required");
      return;
    }

    await axios.put(`${API}/${editingItem.sku}`, {
      ...editForm,
      quantity: Number(editForm.quantity),
    });

    setEditingItem(null);
    fetchItems();
  };

  // STATUS COLOR
  const getStatusClass = (status) => {
    if (!status) return "status";

    const value = status.toLowerCase();

    if (value.includes("out")) return "status red";
    if (value.includes("low")) return "status orange";
    if (value.includes("in")) return "status green";

    return "status";
  };

  return (
    <div className="container">
      <h1>📦 Inventory Manager</h1>

      {/* FORM */}
      <form className="form" onSubmit={addItem}>
        <input
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />
        <button>Add Item</button>
      </form>

      {/* ITEMS */}
      <div className="grid">
        {items.map((item, index) => (
          <div className="card" key={item.sku || index}>
            {editingItem?.sku === item.sku ? (
              <>
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  value={editForm.sku}
                  onChange={(e) =>
                    setEditForm({ ...editForm, sku: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editForm.quantity}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      quantity: e.target.value,
                    })
                  }
                />

                <div className="edit-actions">
                  <button onClick={updateItem}>Save</button>
                  <button onClick={() => setEditingItem(null)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>{item.name}</h3>
                <p>SKU: {item.sku}</p>
                <p>Quantity: {item.quantity}</p>

                <span className={getStatusClass(item.stockStatus)}>
                  {item.stockStatus}
                </span>

                <div className="card-actions">
                  <button onClick={() => startEdit(item)}>Edit</button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.sku)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;