import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.scss";
import { Link, useParams } from "react-router-dom";
import { BiUserCheck } from "react-icons/bi";
import Verify from "~/assets/images/verify.svg";
import Tippy from "@tippyjs/react";
import Image from "../../components/Image";
import Button from "~/components/Core/Button";
import Loader from "~/components/Core/Loader";
import WrapperAuth from "~/components/WrapperAuth";
import handleFollowFunc from "~/utils/handleFollow";
import { getUsersService } from "~/features/accounts/services/getUsersService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { config } from "~/config";  
import Error from "~/components/Core/Error";
import axios from "axios"; 
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

 

function EditProfile() {  
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const navigate = useNavigate(); 
  const user1 = localStorage.getItem("user"); 
  const user = JSON.parse(user1); 
  // console.log('user: ', user  );
  const initialValues = {
    fullname: user.data.fullname , 
    bio: user.data.bio,
    avatar: filename  , 
  };
  

  const validationSchema = Yup.object({
    // fullname: Yup.string().required('fullname is required'),
    // nickname: Yup.string().required('Nickname is required'),
    // email: Yup.string().email('Invalid email address').required('Required'),
    bio: Yup.string().max(150, 'Must be 150 characters or less'),
    // avatar: Yup.string().required('Required'),
    // website: Yup.string().url('Invalid URL'),
    // phone: Yup.string().matches(/^\+?\d+$/, 'Invalid phone number'),
  });

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  const Post = async (url, data, options = {}) => {
    const response = await axiosInstance.post(url, data, options); 
    // console.log('1:  ',response.data);
    return response.data;
  };
  const handleFileChange = (e) => {
    // setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
 
  const handleSubmit = async (values ) => {
    try { 
      const response = await axiosInstance.post('/auth/update', {
        fullname: values.fullname, 
        bio: values.bio,
        avatar: filename,
        userId: user.data._id
      });
      // console.log('Response from backend:', response.data); 
      // localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      // navigate("/@"+ user.data.nickname);
      // Xử lý kết quả trả về từ backend
    } catch (error) {
      console.error('Error while updating profile:', error);
      // Xử lý lỗi khi gửi dữ liệu đến backend
    }
  };
 
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}> 
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="login_form">
                <div className="materialContainer"> 
                  <div className="box">
                    <div className="title">Edit Profile</div>
                    <div className="input">
                      <Field type="text" name="fullname" placeholder="Full Name"  /> 
                      <Error><ErrorMessage name="fullname" /></Error> 
                    </div> 
                    <div className="input">
                      <Field type="text" name="bio" placeholder="Bio"  /> 
                      <Error><ErrorMessage name="bio" /></Error>
                    </div>
                    <div className="input">
                      {/* <input type="file" name="avatar" onChange={handleFileChange} />
                      <label>{filename}</label> */}
                      <Field type="file" name="avatar" onChange={handleFileChange} placeholder="Avatar"   />  
                    </div>
                    <div className="input"> 
                      <label>{filename}</label>  
                    </div>
                     
                    <div className="button login">
                      <button type="submit" disabled={isSubmitting}>
                        <span>Save</span> <i className="fa fa-check"></i>
                      </button>
                    </div>
                  </div> 
                </div>
                  
              </Form>  
            )}
          </Formik>
      </div> 
    </div>
  );
}

export default EditProfile;
