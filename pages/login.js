import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { login, signup, currentUser } = useAuth();
  const router = useRouter(); 

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
        alert("Login successful!");
        router.push("/"); 
      } catch (err) {
        setError("Incorrect email or password");
      }
      return;
    }
    await signup(email, password);
  }

  return (
    <div className={`${styles.login}`}>
      <h1 className="">{isLoggingIn ? "Login" : "register"}</h1>
      {error && <div className={`${styles.error}`}>{error}</div>}
      <div className={`${styles.App}`}>
        <label className={`${styles.label}`}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className={`${styles.input}`}
          />
          <span className={`${styles.inputText}`}>Email Address</span>
        </label>
      </div>
      <div className={`${styles.App}`}>
        <label className={`${styles.label}`}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder=""
            className={`${styles.input} ${styles.password}`}
          />
          <span className={`${styles.inputText}`}>Password</span>
        </label>
      </div>

      <button onClick={submitHandler} className="">
        <a className="">SUBMIT</a>
      </button>
      <h2 className="" onClick={() => setIsLoggingIn(!isLoggingIn)}>
        {!isLoggingIn ? "Login" : "Register"}
      </h2>
    </div>
  );
};

export default Login;
