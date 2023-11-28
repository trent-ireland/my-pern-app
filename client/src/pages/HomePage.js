import React from "react";
import './homepage.css';
import NeighborhoodDropdown from '../components/DropDownMenu';

const HomePage = () => {
  // Define the handleSelectionChange function
  const handleSelectionChange = (event) => {
    // Logic to handle the change in selection
    // For example, you can store the selected value in the state or perform some action
    console.log("Selected Value:", event.target.value);
  };

  return (
    <div className="homepage">
      <NeighborhoodDropdown onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default HomePage;
