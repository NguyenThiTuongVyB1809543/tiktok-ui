import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { Link, useParams } from "react-router-dom";
import { BiUserCheck } from "react-icons/bi";
import Verify from "~/assets/images/verify.svg";
import Tippy from "@tippyjs/react";
import Image from "../../components/Image";
import Button from "~/components/Core/Button";
import { FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";
import { BsPlusCircle, BsTrash } from "react-icons/bs";
import { FiMinusCircle } from 'react-icons/fi';


import Loader from "~/components/Core/Loader";
import WrapperAuth from "~/components/WrapperAuth";
import handleFollowFunc from "~/utils/handleFollow";
import { getUsersService } from "~/features/accounts/services/getUsersService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";  

import axios from "axios";
   
const srcAvatar = "src/assets/images/";

function Cart() { 
  return (
  <div className={styles.wrapper}>
    <div className={styles.header}> 
      <div className={styles.info}> 
        <div className={styles.title_container}>
          <h2 className={styles.user_title}>
            Cart 
          </h2> 
        </div>
      </div> 
    </div>


    <div className={styles.list_video_wrapper}> 
      <div className={styles.list_video_container}>
        <div className={styles.list_video}>  
          <div className={styles.title_wrapper}>
            <p className={styles.title}>Name seller 1</p> 
            <p className={styles.title}></p>
          </div> 
          <div className={styles.video_container}>
            <Image 
              src= {srcAvatar + "Avatar2.jpg"}  
              className={styles.imgproduct}
            /> 
            <div className={styles.product_container}> 
              <div className={styles.product_name}>
                <p>Product name</p>
              </div>
              <div className={styles.product_desc}>
                <p>Description: đây là mô tả đây</p>   
              </div>
              <div className={styles.product_price}>
                <p>Price: 20000</p>
              </div> 
            </div> 
            <div className={styles.product_action}>
              <Button outline large  > 
                <BsPlusCircle />
              </Button> 
              
              <Button outline large  > 
                <FiMinusCircle />
              </Button>

              <Button outline large  > 
                <BsTrash />
              </Button> 
            </div>
            <div className={styles.product_number}>
              10
            </div> 
          </div> 
          <div className={styles.video_container}>
            <Image 
              src= {srcAvatar + "Avatar2.jpg"}  
              className={styles.imgproduct}
            /> 
            <div className={styles.product_container}> 
              <div className={styles.product_name}>
                <p>Product name</p>
              </div>
              <div className={styles.product_desc}>
                <p>Description: đây là mô tả đây</p>   
              </div>
              <div className={styles.product_price}>
                <p>Price: 20000</p>
              </div> 
            </div> 
            <div className={styles.product_action}>
              <Button outline large  > 
                <BsPlusCircle />
              </Button> 
              
              <Button outline large  > 
                <FiMinusCircle />
              </Button>

              <Button outline large  > 
                <BsTrash />
              </Button> 
            </div>
            <div className={styles.product_number}>
              10
            </div> 
          </div> 
          <div className={styles.video_container}>
            <Image 
              src= {srcAvatar + "Avatar2.jpg"}  
              className={styles.imgproduct}
            /> 
            <div className={styles.product_container}> 
              <div className={styles.product_name}>
                <p>Product name</p>
              </div>
              <div className={styles.product_desc}>
                <p>Description: đây là mô tả đây</p>   
              </div>
              <div className={styles.product_price}>
                <p>Price: 20000</p>
              </div> 
            </div> 
            <div className={styles.product_action}>
              <Button outline large  > 
                <BsPlusCircle />
              </Button> 
              
              <Button outline large  > 
                <FiMinusCircle />
              </Button>

              <Button outline large  > 
                <BsTrash />
              </Button> 
            </div>
            <div className={styles.product_number}>
              10
            </div> 
          </div> 

          <div className={styles.footer_wrapper}>      
            <p className={styles.footer}>Total: </p> 
            <p className={styles.footer}> </p> 

          </div> 
          <div className={styles.noneline_wrapper}>      
            <p className={styles.noneline}></p> 
          </div>

             
        </div>

        <div className={styles.list_video}>  
          <div className={styles.title_wrapper}>
            <p className={styles.title}>Name seller 1</p> 
            <p className={styles.title}></p>
          </div>
 
          <div className={styles.video_container}>
            <Image 
              src= {srcAvatar + "Avatar2.jpg"}  
              className={styles.imgproduct}
            /> 
            <div className={styles.product_container}> 
              <div className={styles.product_name}>
                <p>Product name</p>
              </div>
              <div className={styles.product_desc}>
                <p>Description: đây là mô tả đây</p>   
              </div>
              <div className={styles.product_price}>
                <p>Price: 20000</p>
              </div> 
            </div> 
            <div className={styles.product_action}>
              <Button outline large  > 
                <BsPlusCircle />
              </Button> 
              
              <Button outline large  > 
                <FiMinusCircle />
              </Button>

              <Button outline large  > 
                <BsTrash />
              </Button> 
            </div>
            <div className={styles.product_number}>
              10
            </div> 
          </div> 

          <div className={styles.footer_wrapper}>      
            <p className={styles.footer}>Total: </p> 
            <p className={styles.footer}> </p> 

          </div>

          <div className={styles.noneline_wrapper}>      
            <p className={styles.noneline}></p> 
          </div>

             
        </div>
      </div>
    </div>
    <Button outline large  > 
      Checkout 
    </Button> 
     
  </div>
  );
}

export default Cart;