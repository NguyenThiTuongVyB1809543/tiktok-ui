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

 

function EditProfile() { 
  const initialValues = {
    fullName: '',
    nickname: '', 
    bio: '',
    avatar: '', 
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('FullName is required'),
    nickname: Yup.string().required('Nickname is required'),
    // email: Yup.string().email('Invalid email address').required('Required'),
    bio: Yup.string().max(150, 'Must be 150 characters or less'),
    // avatar: Yup.string().required('Required'),
    // website: Yup.string().url('Invalid URL'),
    // phone: Yup.string().matches(/^\+?\d+$/, 'Invalid phone number'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('values', values);
    setSubmitting(false);
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
                      <Field type="text" name="fullName" placeholder="Full Name" /> 
                      <Error><ErrorMessage name="fullName" /></Error>
                    
                    </div>

                    <div className="input">
                      <Field type="text" name="nickname" placeholder="Nickname" />
                      <Error><ErrorMessage name="nickname" /></Error>
                    </div>

                    <div className="input">
                      <Field type="text" name="bio" placeholder="Bio" />
                      <Error><ErrorMessage name="bio" /></Error>
                    </div>
                    <div className="input">
                      <Field type="text" name="avatar" placeholder="Avatar" /> 
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
