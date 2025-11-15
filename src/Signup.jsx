import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // ✅ state stays
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      if (res.ok) {
        alert("Signup Successful! Please go to Login.");
      } else {
       alert("Signup Failed: " + text);
      }
    } catch (error) {
      setMessage("⚠️ Server not reachable");
      console.error(error);
    }
  };

  const handlegotoLogin = () => {
    navigate("/");
  };

  return (
    <div className="form-section"  style={{backgroundColor : "#f7f8f9ff", height: "100vh" }}>
      <form className="login-form" onSubmit={handleSubmit}>
        <center>
          <div className="cap-logo"></div>
          <h2>Welcome!</h2>
        </center>
        <p>Please enter your details</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Sign in
        </button>
        <button type="button" className="google-btn">
          Sign in with Google
        </button>
      <br></br>
        <button type="button"className="login-btn" onClick={handlegotoLogin}>
          Go Home
        </button>

        {/* ✅ show backend message here */}
        {message && (
          <p style={{ marginTop: "10px", color: "white" }}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Signup;
