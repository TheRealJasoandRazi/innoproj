import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import MarketPlace from "./Components/MarketPlace";
import AssetsPage from "./Components/AssetsPage";
import Transactions from "./Components/Transactions";
import FAQpage from "./Components/FAQ";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market-place" element={<MarketPlace />} />
        <Route path="/asset" element={<AssetsPage />} />
        <Route path="/faq" element={<FAQpage />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </>
  );
}

export default App;
