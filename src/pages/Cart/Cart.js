import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
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
          <div className={styles.video_container}>
            <Image 
              src= {srcAvatar + "Avatar2.jpg"}  
              className={styles.imgproduct}
            />
              <div className={styles.product_desc}>
                <p>mô tả đồ đi</p>
              </div>
          </div> 
          <div className={styles.video_container}>
            <Image 
              src= {srcAvatar + "Avatar2.jpg"}  
              className={styles.imgproduct}
            />
            <div className={styles.video_desc}>
              <p>mô tả đồ đi</p>
            </div>
          </div> 
          <div className={styles.video_container}>
            <Image 
              src= {srcAvatar + "Avatar2.jpg"}  n 
              className={styles.imgproduct}
            />
            <div className={styles.video_desc}>
              <p>mô tả đồ đi</p>
            </div>
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
