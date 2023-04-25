import React, { useEffect } from "react";
import "./Login.scss";
import Error from "~/components/Core/Error";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "~/config";
import { userRegister } from "~/features/authentication/userAction";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "~/features/authentication/services/postUserService";
import { request } from "~/utils/axiosInstance";
import axios from "axios";


function Register() {
  const { loading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // navigate(config.routes.home);
      navigate(config.routes.login);
    }
  }, [navigate, user]);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  const Post = async (url, data, options = {}) => {
    const response = await axiosInstance.post(url, data, options); 
    console.log('1:  ',response.data);
    return response.data;
  };
  const Register = async ({ email, nickname, password, type }) => {
    const res = await Post(config.authApi.register, {
      email,
      nickname,
      password,
      type,
    });
    console.log('2:  ',res);
    return res;
  };
  const userRegister = createAsyncThunk(
    config.authApi.register,
    async ({ email, nickname, password, type }, { rejectWithValue }) => {
      try {
        const user = await Register({
          email,
          nickname,
          password,
          type,
        });
        user && localStorage.setItem("user", JSON.stringify(user));
        console.log('3:  ',user);
        // return user.data;
        return user;
      } catch (error) {
        if (error.response && error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        } else {
          return rejectWithValue(error.response.data.message);
        }
      }
    }
  );

  const submitForm = (data) => {
    // dispatch(userRegister(data)); 
    dispatch(userRegister(data));
    // console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="login_form">
      <div className="materialContainer">
        <div className="box">
          <div className="title">REGISTER</div>
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
                type="text"
                name="nickname"
                id="nickname"
                placeholder="Nickname"
                {...register("nickname")}
                required
              />
          </div>
          <div className="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <input
            value="email"
            type="hidden"
            name="type"
            id="type"
            {...register("type")}
          />
          {error && (
            <Error>
              {error.password
                ? error.password[0]
                : "This account is already registered"}
            </Error>
          )}
          <div className="button login">
            <button type="submit" disabled={loading}>
              <span>Register</span> <i className="fa fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
