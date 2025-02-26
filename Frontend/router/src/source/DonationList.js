import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DonationList.css";
import Donate from './Donate'
const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:3005/aboutFoodRoutes/donationList");
      if (res.status === 200 && Array.isArray(res.data)) {
        setDonations(res.data);
      } else {
        console.error("Failed to fetch donations. Status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading donations...</p>;
  }

  if (donations.length === 0) {
    return <p>No donations found.</p>;
  }

  return (
    <div className="donation-list-container">
      <h1 className="donation-list-title">Donation Items</h1>
      <div className="donation-cards">
        {donations.map((donation, index) => (
          <div key={index} className="donation-card">
            <h2 className="donor-name">Donor: {donation.donorName}</h2>
            <p><strong>Phone:</strong> {donation.phoneNumber}</p>
            <p><strong>Address:</strong> {donation.address}</p>
            <div className="items-list">
              <h3>Items:</h3>
              {donation.items && donation.items.length > 0 ? (
                donation.items.map((item, idx) => (
                  <p key={idx}>
                    🍽️ {item.name} - {item.quantity} {item.unit}
                  </p>
                ))
              ) : (
                <p>No items listed.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Donate/>
    </div>
   
  );
};

export default DonationList;
