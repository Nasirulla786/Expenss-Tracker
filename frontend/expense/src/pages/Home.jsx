import React from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userdata/userslice";
import axios from "axios";
import { serverURL } from "../App";
import WelcomePage from "./WelcomePage";

const Home = () => {

  return (
    <div>

      <WelcomePage />
    </div>
  );
};

export default Home;
