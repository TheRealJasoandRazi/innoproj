// Importing necessary libraries and components
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import CSS styles
import App from "./App"; // Import the main application component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import { CartProvider } from "./Contexts/CartContext"; // Import the CartProvider component
import { UserProvider } from "./Contexts/UserContext";

// Create a React root using ReactDOM.createRoot and attach it to the HTML element with the id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application within a StrictMode for improved development checks
root.render(
  <React.StrictMode>
    {/* Wrap the entire application with the CartProvider to provide cart state to components */}
    <UserProvider>
      <CartProvider>
        {/* Wrap the application with BrowserRouter for client-side routing */}
        <BrowserRouter>
          {/* Render the main App component */}
          <App />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
