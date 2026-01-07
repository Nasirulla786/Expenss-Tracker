import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import axios from "axios";
import { setUserData } from "./redux/userdata/userslice";
import Mainscreen from "./pages/Mainscreen";
import Addexpense from "./pages/Addexpense";
import Dashboard from "./pages/Dashboard";

export const serverURL = "https://expenss-tracker-1.onrender.com";

function App() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(()=>{
    const fetchCurrentUser = async()=>{
      try {
        const currentuser = await axios.get(`${serverURL}/api/user/currentuser`, {withCredentials:true});
        dispatch(setUserData(currentuser.data))


      } catch (error) {
        console.log("error of current user", error);

      }
    }
    fetchCurrentUser();

  },[])


  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={userData.userData ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/signup"
          element={!userData.userData ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!userData.userData ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/mainscreen" element={<Mainscreen />} />
        <Route path="/addexpense" element={<Addexpense />}/>
        <Route path="/dashboard" element={<Dashboard />}/>

      </Routes>
    </div>
  );
}

export default App;
