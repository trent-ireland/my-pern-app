import React, { useState } from "react";
import './signUpForm.css';

const SignUpForm = () => {
  // State variables to store user selections
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
  };

  return (
    <div className="signup-form">
      <h2>Signup </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Select a Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <label htmlFor="neighborhood">Choose a Neighborhood:</label>
        <select
          id="neighborhood"
          value={selectedNeighborhood}
          onChange={(e) => setSelectedNeighborhood(e.target.value)}
        >
          <option value="">Select Neighborhood</option>
          {/* Populate options dynamically */}
        </select>

        <label htmlFor="timeSlot">Choose a Time Slot:</label>
        <select
          id="timeSlot"
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          <option value="">Select Time Slot</option>
          {/* Populate options dynamically */}
        </select>

        {/* Additional form fields for signup (e.g., name, email, etc.) */}
        {/* ... */}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
