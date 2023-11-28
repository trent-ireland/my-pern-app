import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Import your main App component

// Ensure that the 'root' element exists in your index.html file
const container = document.getElementById('root'); 

// Create a root.
const root = createRoot(container); 

// Initial render: Render an element to the root.
root.render(<App />);
