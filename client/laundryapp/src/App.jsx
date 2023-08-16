import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./pages/login/Login.jsx";
import Welcome from "./pages/welcome/Welcome.jsx";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/userContext";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  const [userData, setUserData] = useState(() => {

    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  return (
    <>
      <UserContextProvider>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/Profile" element={<Profile userData={userData} />} />
        <Route
          path="/dashboard"
          element={<Dashboard userData={userData} setUserData={setUserData} />}
        /> */}{" "}
          <Route
            path="/dashboard"
            element={
              <Dashboard userData={userData} setUserData={setUserData} />
            }
          />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
