import NavBar from "./Navbar";
import Home from "./Home";
import MarketPlace from "./MarketPlace";
import AssetsPage from "./AssetsPage";
import FAQpage from "./FAQ";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/market-place" element={<MarketPlace />}></Route>
        <Route path="/asset" element={<AssetsPage />}></Route>
        <Route path="/faq" element={<FAQpage />}></Route>
      </Routes>
    </>
  );
}

export default App;
