import React from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { config } from "~/config";
import { userLogin } from "~/features/authentication/userAction";
import Error from "~/components/Core/Error";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

   
function Login() {
  const { loading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(config.routes.home);
      // navigate(config.routes.login);
    }
  }, [navigate, user]);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  const Post = async (url, data, options = {}) => {
    const response = await axiosInstance.post(url, data, options);  
    console.log('response.data: ',response.data);
    return response.data;
  };
  const Login = async ({ email, nickname, password }) => {
    const res = await Post(config.authApi.login, {
      email,
      nickname,
      password,
    }); 
    // console.log('res: ',res);
    return res;
  };

  const userLogin = createAsyncThunk(
    config.authApi.login,
    async ({ email, nickname, password }, { rejectWithValue }) => {
      try {
        const user = await Login({
          email,
          nickname,
          password,
        });
        user && localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        return user.data;
        // return user;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
  const submitForm = (data) => {
    dispatch(userLogin(data));
    console.log('data: ',data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="login_form">
      <div className="materialContainer">
        <div className="box">
          <div className="title">LOGIN</div>
          <div className="input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              required
            />
          </div>

          <div className="input">
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Password"
              {...register("password")}
            />
          </div>

          {error && <Error>Wrong email or password</Error>}

          <div className="button login">
            <button type="submit" disabled={loading}>
              <span>Login</span> <i className="fa fa-check"></i>
            </button>
          </div>

          {/* <a href="#" className="pass-forgot">
            Forgot your password?
          </a> */}
        </div>
      </div>
    </form>
  );
}

export default Login;
