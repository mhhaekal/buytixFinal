import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile";
import Products from "./Pages/Products";
import Landing from "./Pages/Landing/Landing";
import LandingV2 from "./Pages/Landing/LandingV2";
import CatPage from "./Pages/Category Page/CatPage";
import "./App.css";
import Data from "./Pages/Data/index";
import Buy from "./Pages/Buy/Buy";
import BuySuccess from "./Pages/Buy/BuySucess";
import Create from "./Pages/Create/Create,";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onCheckisLogin } from "./redux/Features";
import CreateSucess from './Pages/Create/CreateSucess';
import AllEvents from './Pages/AllEvents/AllEvents';
import CardPage from './Pages/CardItem/CardPage';
import toast, { Toaster } from "react-hot-toast";
import Verify from "./Pages/verify/verify";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/verify/")) return;
    if (location.pathname === "/login") return;
    if (location.pathname === "/register") return;
    dispatch(onCheckisLogin());
  }, []);
  return (
    <div data-theme="light">
      {/* <Landing /> */}

      {/* <CatPage /> */}
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<LandingV2 />} />
        <Route path="/category" element={<CatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/buy/success/:id" element={<BuySuccess />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create/success" element={<CreateSucess />} />
        <Route path="/allevents" element={<AllEvents />} />
        <Route path="/carditem/:id" element={<CardPage />} />
        <Route path="/verify/:token" element={<Verify />} />
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
    </div>
  );
}

export default App;
