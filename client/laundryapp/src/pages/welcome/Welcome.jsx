import React, { Component, useState } from "react";
// import Typical from "react-typical";
import "./welcome.css";
import Typewriters from "../../components/Typewriters";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("abcdefghijklmnopqrstuvwxyz");
  const handleLoginClick = () => {
    navigate("/login"); // Replace "/login" with the actual path to your login page
  };

  const handleSignupClick = () => {
    navigate("/signup"); // Replace "/signup" with the actual path to your signup page
  };
  return (
    <div className="welcome-wrapper">
      <div className="leftSide">
        {/* <div className="logo">WashDayz</div> */}
        <img src="./images/logos.PNG"></img>

        <div className="slogans">
          <div className="sloganContainer">
            <div className="title">Laundry Scheduling</div>
            <Typewriters text="hello world" />
            {/* <p className="description">It just makes sense</p> */}
            {/* 
             done right
             for you and your family */}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="flexColCenter rightSide__container ">
          <div className="flexColCenter rightSide__main ">
            <h1>Get Started</h1>
            <div className="buttons">
              <button className="loginButton button" onClick={handleLoginClick}>
                Login
              </button>
              <button
                className="signupButton button"
                onClick={handleSignupClick}
              >
                Signup
              </button>
            </div>
          </div>
          <div className=" absolute rightSide__footer flexColCenter">
            <div className=" secondaryText companyName">WashWorks</div>
            <div className="secondaryText flexCenter row bottomText">
              <div className="div">Terms of Use</div>
              <span>|</span>
              <div className="div">Private Policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
