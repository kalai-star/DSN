import React, { useState } from "react";
import "./Receiver.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Receiver = () => {
  const navigate = useNavigate(); // Initialize useNavigate properly
  const [message, setMessage] = useState("");

  // Initialize all required form fields, including 'location'
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    location: "" // Added 'location' field initialization
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    axios
      .post("http://localhost:3005/receive/receiver", formData)
      .then((res) => {
        alert("Details added successfully");
        setMessage("Details added successfully");
        console.log(res);
        
        // Navigate only on successful form submission
        setTimeout(() => {
          navigate("/UploadItems");
        }, 1000);
      })
      .catch((err) => {
        setMessage("Something went wrong");
        console.error("Error submitting form:", err);
      });
  };

  return (
    <div className="form">
      <h1 className="head">Receiver Form</h1>
      <form onSubmit={handleSubmit}>
        <label className="lab1" htmlFor="name">
          Name
        </label>
        <br />
        <input
          className="inp1"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
        <br />
        <label className="lab1" htmlFor="phoneNumber">
          Phone Number
        </label>
        <br />
        <input
          className="inp1"
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />
        <br />
        <label className="lab1" htmlFor="address">
          Address
        </label>
        <br />
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          required
        />
        <br />
        <label className="lab1" htmlFor="location">
          Location
        </label>
        <br />
        <input
          className="inp1"
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
          required
        />
        <br />
        <button type="submit" className="buttonup">
          Submit
        </button>
        <br />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Receiver;
