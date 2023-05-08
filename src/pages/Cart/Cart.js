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
import { getUsersCartService } from "~/features/carts/services/getUsersCartService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";   
import axios from "axios";  
function Cart() {
  const srcAvatar = "src/assets/images/";
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  const usercurrent = user3.data;
  const [loading, setLoading] = useState(true);

  const [cartData , setCartData ] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersCartService.getUserCart();
      setCartData(result);
      console.log('result: ',result);
      setLoading(false);
    };
    fetchApi();
  }, []);

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
    <div>
      
    </div>
    {Object.keys(cartData).map((sellerId) => {
        const sellerData = cartData[sellerId];
        return (
          <div key={sellerId} className={styles.list_video_wrapper}> 
            <div className={styles.list_video_container}>
              <div className={styles.list_video}>  
                <div className={styles.title_wrapper}>
                  <p className={styles.title}>{sellerData.sellerName}</p> 
                  <p className={styles.title}></p>
                </div>  
                {sellerData.products.map((product) => (
                  <div key={product.productId} className={styles.video_container}>
                    <Image 
                      src={product.productImg}  
                      className={styles.imgproduct}
                    /> 
                    <div className={styles.product_container}> 
                      <div className={styles.product_name}>
                        <p>{product.productName}</p>
                      </div>
                      <div className={styles.product_desc}>
                        <p>Description: {product.productDescription}</p>   
                      </div>
                      <div className={styles.product_price}>
                        <p>Price: {product.productPrice}</p>
                      </div> 
                    </div> 
                    <div className={styles.product_action}>
                      <Button outline large> 
                        <BsPlusCircle />
                      </Button> 
                      
                      <Button outline large> 
                        <FiMinusCircle />
                      </Button>

                      <Button outline large> 
                        <BsTrash />
                      </Button> 
                    </div>
                    <div className={styles.product_number}>
                      {product.quantity}
                    </div> 
                  </div> 
                ))}
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
        );
      })}
       
    <Button outline large  > 
      Checkout 
    </Button> 
     
  </div>
  );
}

export default Cart;
