import React from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userdata/userslice";
import axios from "axios";
import { serverURL } from "../App";
import WelcomePage from "./WelcomePage";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>

      <WelcomePage />
      {/* <button
        onClick={ async() => {
            const res = await axios.get(`${serverURL}/api/user/logout` , {withCredentials:true});
            if(res){

          dispatch(setUserData(null));

            }

        }}
      >
        Logout
      </button> */}
    </div>
  );
};

export default Home;
