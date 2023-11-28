import React, { useState, useEffect } from 'react';

function NeighborhoodDropdown() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  useEffect(() => {
    fetch(' http://localhost:3001/neighborhoods')
      .then(response => response.json())
      .then(data => setNeighborhoods(data))
      .catch(error => console.error('Error fetching neighborhoods: ', error));
  }, []);

  const handleNeighborhoodChange = (event) => {
    setSelectedNeighborhood(event.target.value);
  };

  return (
    <select value={selectedNeighborhood} onChange={handleNeighborhoodChange}>
      {neighborhoods.map(neighborhood => (
        <option key={neighborhood.id} value={neighborhood.name}>
          {neighborhood.name}
        </option>
      ))}
    </select>
  );
}

export default NeighborhoodDropdown;
