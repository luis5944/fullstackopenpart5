import React from "react";
import { useState } from "react";
import loginService from "../services/login";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationError, setNotificationError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      setUsername("");
      setPassword("");
      localStorage.setItem("loginData", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      setNotificationError("Wrong Username or Password");
      setTimeout(() => {
        setNotificationError("");
      }, 3000);
    }
  };

  return (
    <>
      <h1>log in to application</h1>
      {notificationError ? <h2>{notificationError}</h2> : ""}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
