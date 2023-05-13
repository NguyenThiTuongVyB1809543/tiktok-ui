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

 

function EditAddress(props) {   
  const { user } = props; 
  const navigate = useNavigate();  
  console.log('user: ', user); 
 


  const initialValues = {
    address: user.address, 
    phone: user.phone, 
  };
   
  const validationSchema = Yup.object({ 
    address: Yup.string().required('Address is required'),
    phone: Yup.string().matches(/^\+?\d+$/, 'Invalid phone number'),
  });

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  const Post = async (url, data, options = {}) => {
    const response = await axiosInstance.post(url, data, options); 
    // console.log('1:  ',response.data);
    return response.data;
  };
  
 
  const handleSubmit = async (values ) => {
    try { 
      const response = await axiosInstance.post('/auth/edit_address', {
        address: values.address, 
        phone: values.phone,
        userId: user._id
      });
      // console.log('Updated form values:', values);
      navigate("/"); 
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
                <Form className="form_edit_address"> 
                  <div className="form_edit_address">
                    {/* <div className="title">Edit Shipping Address</div> */}
                    <div className="input_address">
                      <Field type="text" name="address" placeholder="Address"  /> 
                      <Error><ErrorMessage name="address" /></Error> 
                    </div> 
                    <div className="input_phone">
                      <Field type="text" name="phone" placeholder="Phone Number"  /> 
                      <Error><ErrorMessage name="phone" /></Error>
                    </div> 
                    <div className="button_edit_address">  
                        <Button outline type="submit"  >
                          <span>Save</span> <i className="fa fa-check"></i>
                        </Button>  
                    </div>
                  </div>  
                </Form>  
              )}
            </Formik>
        </div>  
    </div>
  );
}

export default EditAddress;
