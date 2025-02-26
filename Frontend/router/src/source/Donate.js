import React, { useState } from "react";
import axios from "axios";
import "./Don.css";

const UploadItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Person");
  const [items, setItems] = useState([]);
  const [donorName, setDonorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleAddItem = () => {
    if (itemName.trim() && unit.trim()) {
      setItems([...items, { name: itemName, quantity, unit: unit }]);
      setIsModalOpen(false);
      setItemName("");
      setUnit("");
    }
  };

  const handleDone = async (e) => {
    e.preventDefault();
    const formData = {
      donorName,
      phoneNumber,
      address,
      items,
    };
    console.log("Sending formData to server:", formData);
    try {
      const res = await axios.post("http://localhost:3005/donation/donate", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 201) {
        alert("Items added, Thank You for your Support!!");
        setDonorName("");
        setPhoneNumber("");
        setAddress("");
        setItems([]);
      } 
      else {
        alert("Failed to save data. Server response: " + res.statusText);
      }
    } 
    catch (error) {
      console.error("Error saving data:", error?.response?.data || error.message);
      alert("Failed to save data. Please check the console for more details.");
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleDone}>
        <label className="l1">Donor Name:</label>
        <input
          type="text"
          id="l1"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
        <label className="l2">Phone Number:</label>
        <input
          type="tel"
          id="l2"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <label className="l3">Address:</label>
        <textarea
          id="l3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <div className="item-list">
          <button
            type="button"
            className="add-item-button"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="plus-sign">+</span>
            <span className="add-item-text">Add Item</span>
          </button><br/><br/>

          {items.map((item, index) => (
            <div key={index} className="item-card">
              <span className="item-icon">🍽️</span>
              <p>{item.name}</p>
              <small>
                {item.quantity} {item.unit}
              </small>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <button type="submit" className="done">
            Done
          </button>
        )}
      </form>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <input
              type="text"
              placeholder="Type the Name of Item"
              className="input-field"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <select
              className="dropdown"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              <option value="Person">Person</option>
              <option value="Kilograms">Kilograms</option>
              <option value="Liters">Liters</option>
            </select>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="input-field"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            <button className="add-button" onClick={handleAddItem}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UploadItems;
