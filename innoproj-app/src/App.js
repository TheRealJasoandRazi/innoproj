// Import necessary components and libraries
import NavBar from "./Components/Navbar"; // Import the Navbar component
import Home from "./Components/Home"; // Import the Home component
import MarketPlace from "./Components/MarketPlace"; // Import the MarketPlace component
import AssetsPage from "./Components/AssetsPage"; // Import the AssetsPage component
import Transactions from "./Components/Transactions"; // Import the Transactions component
import FAQpage from "./Components/FAQ"; // Import the FAQpage component
import LogOut from "./Components/Logout";
import LogIn from "./Components/Login";
import Cart from "./Components/Cart"; // Import the Cart component
import { Route, Routes } from "react-router-dom"; // Import Route and Routes from react-router-dom

// Define the main App component
function App() {
  return (
    <>
      {/* Render the Navbar component */}
      <NavBar />
      <Routes>
        {/* Define routes for different URLs */}
        {/* Render the Home component when the URL is "/" */}
        <Route path="/" element={<Home />} />
        {/* Render the MarketPlace component when the URL is "/market-place" */}
        <Route path="/market-place" element={<MarketPlace />} />
        {/* Render the AssetsPage component when the URL is "/asset" */}
        <Route path="/asset" element={<AssetsPage />} />
        {/* Render the FAQpage component when the URL is "/faq" */}
        <Route path="/faq" element={<FAQpage />} />
        {/* Render the Transactions component when the URL is "/transactions" */}
        <Route path="/transactions" element={<Transactions />} />
        {/* Render the Cart component when the URL is "/cart" */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

// Export the App component as the default export
export default App;
