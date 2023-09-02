import NavBar from "./Navbar";
import Home from "./Home";
import MarketPlace from "./MarketPlace";
import AssetsPage from "./AssetsPage";
import Transactions from "./Transactions";
import FAQpage from "./FAQ";
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
