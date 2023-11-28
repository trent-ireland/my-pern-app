import React from "react"; 
import './homepage.css';
import NeighborhoodDropdown from '../components/DropDownMenu'

const HomePage = () => {
  return (
    <div className="homepage">
     
      <NeighborhoodDropdown onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default HomePage;
