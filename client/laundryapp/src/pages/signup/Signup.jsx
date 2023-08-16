import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    profileImage: { myFile: "" },
    loggedIn: false,
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function testt(e) {
    console.log("New");
    e.preventDefault();
    // await axios.post("/register");
    const newPerson = { ...form };

    const {
      firstName,
      lastName,
      email,
      username,
      password,
      loggedIn,
      profileImage,
    } = form;
    // console.log(typeof profileImage);

    console.log("PROFILE", profileImage);
    if (profileImage.myFile == "") {
      toast.error("select image");
    } else {
      try {
        const { data } = await axios.post("/register ", {
          firstName,
          lastName,
          email,
          username,
          password,
          loggedIn,
          profileImage,
        });

        if (data.error) {
          toast.error(data.error);
        } else {
          setForm({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            profileImage: { myFile: "" },
            loggedIn: true,
          });
          toast.success("login success");
          navigate("/login");
        }
        console.log("good");
      } catch (err) {
        console.error(err);
        console.log(err);
      }
    }
  }

  const handleImage = async (files) => {
    const file = files[0];
    const base64 = await setFileToBase(file);
    updateForm({ profileImage: { myFile: base64 } });
    console.log(base64);
  };

  return (
    <div className="signupWrapper">
      <div className="signupContainer ">
        <div className="logoutButton">logo</div>
        <span className="signup">Sign Up</span>

        <form className="formContainer" onSubmit={testt}>
          <div className="nameInput">
            <div className="nameInputContainer">
              <input
                type="text"
                id="firstName"
                placeholder=" "
                value={form.firstName}
                onChange={(e) => updateForm({ firstName: e.target.value })}
              ></input>
              <label
                className="absolute left placeholder firstname"
                htmlFor="firstName"
              >
                First Name
              </label>
            </div>
            <div className="nameInputContainer">
              <input
                type="text"
                placeholder=" "
                id="lastName"
                value={form.lastName}
                onChange={(e) => updateForm({ lastName: e.target.value })}
              ></input>
              <label
                className="absolute left placeholder lastname"
                htmlFor="lastName"
              >
                Last Name
              </label>
            </div>
          </div>
          <div className="formInput">
            <input
              type="text"
              id="email"
              placeholder=" "
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            ></input>
            <label className="absolute left placeholder email" htmlFor="email">
              Email{" "}
            </label>
          </div>
          <div className="formInput">
            <input
              type="text"
              id="username"
              placeholder=" "
              value={form.username}
              onChange={(e) => updateForm({ username: e.target.value })}
            ></input>
            <label
              className="absolute placeholder left username"
              htmlFor="username"
            >
              Username
            </label>
          </div>
          <div className="formInput">
            <input
              type="text"
              id="password"
              placeholder=" "
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            ></input>
            <label
              className="absolute left placeholder password"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flexCenter uploadImageContainer">
            <label htmlFor="profileImage" className="custom-file-input">
              <AiOutlineCloudUpload size={25} />
              <span>Choose Profile Image</span>
            </label>
            <span className="file-name">
              {form.profileImage.myFile
                ? form.profileImage.myFile.name
                : "No file chosen"}
            </span>
            <input
              type="file"
              accept=".jpeg, .png, .jpg"
              id="profileImage"
              onChange={(event) => {
                handleImage(event.target.files);
              }}
            />
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="btn btn-primary"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Signup;

function setFileToBase(files) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    console.log(reader.result);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}
