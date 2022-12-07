import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { loginUser, validateEmail } from "../../services/authService";

import { AiOutlineLogin } from "react-icons/ai";
import { BarLoader } from "react-spinners";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const color = "#ff4500";
const Loader = <BarLoader color={color} speedMultiplier={2} />;

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);

      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // console.log("on reload");
    return () => {
      console.log("page reloaded, preventing multiple toast");
    };
  }, []);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineLogin size={35} color="#999" />
          </div>
          <h2 className="log">Login</h2>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
