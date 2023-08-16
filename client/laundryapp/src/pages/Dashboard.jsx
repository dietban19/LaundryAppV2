import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Dashboard = ({ userData, setUserData }) => {
  const { user, setUser } = useContext(UserContext);
  const [userDatas, setUserDatas] = useState(user);
  const [myComment, setMyComment] = useState([]);

  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUserData(user);
      }
      if (!user) {
        navigate("/login");
      }
    }, 900);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user]);
  const handleLogout = () => {
    navigate("/profile");
  };
  // console.log(user.profileImage);
  return (
    <div className="dashboard-wrapper">
      <div className="paddings flexCenter innerWidth dashboard-container">
        Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
