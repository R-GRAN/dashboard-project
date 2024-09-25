import Header from "@/components/Header/Header.jsx";
import Sidebar from "@/components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Add from "@/pages/Add/Add";
import List from "@/pages/List/List";
import Orders from "@/pages/Orders/Orders";
import LoginPopUp from "@/components/LoginPopUp/LoginPopUp";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <Header />
      <hr />
      <div className="app-content">
        <Sidebar />
      <ToastContainer />
        <Routes>
          <Route path="/add" element={<Add setShowLogin={setShowLogin} />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
