import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./login.css";
const Login = () => {
  //   axios.defaults.baseURL = "http://localhost:5175";
  //   axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function testt(e) {
    e.preventDefault();
    console.log(form);
    const { email, password } = form;
    console.log(email, password);
    try {
      const { data } = await axios.post("/login ", {
        email,
        password,
      });
      console.log(email, data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setForm({ email: "", password: "" });
        toast.success("login success");
        console.log("success");
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 3000);
      }
      console.log("good");
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  }

  return (
    <div className="flexColCenter loginWrapper">
      <div className="loginContainer ">
        <div className="logoutButton">logo</div>
        <span className="login">Login</span>
        <div className="form">
          <form onSubmit={testt}>
            <div className="formInput">
              <input
                type="text"
                id="email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              ></input>
              <label
                className="absolute left placeholder email"
                htmlFor="email"
              >
                Email:{" "}
              </label>
            </div>
            <div className="formInput">
              <input
                type="text"
                id="password"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
              ></input>{" "}
              <label
                className="absolute left placeholder password"
                htmlFor="password"
              >
                password:{" "}
              </label>
            </div>

            <input
              type="submit"
              value="Login"
              className="btn btn-primary"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
