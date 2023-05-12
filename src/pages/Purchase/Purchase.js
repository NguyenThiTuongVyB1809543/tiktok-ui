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
import { FiMinusCircle, FiEdit } from 'react-icons/fi';
import Cart from "~/pages/Cart";

import Loader from "~/components/Core/Loader";
import WrapperAuth from "~/components/WrapperAuth";
import handleFollowFunc from "~/utils/handleFollow";
import { getUsersService } from "~/features/accounts/services/getUsersService";
import { cartService } from "~/features/carts/services/cartService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";   
import axios from "axios";  
function Purchase(cartdata) {
  const srcAvatar = "src/assets/images/";
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  // console.log('user', user3.data._id);
  const usercurrent = user3.data;
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(false);
  const [user, setUser] = useState({});
  const [backtocart, setBackToCart] = useState(false);

  const [cartData , setCartData ] = useState(cartdata.cartdata);
   

   
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersService.currentUser(user3.data._id);
      setUser(result); 
    };

    fetchApi();
  }, []);
  // console.log('backToCart: ', backToCart);

   
  let totalAmount = 0;
  const backToCart  = async () => {
    setBackToCart(true);
  };
   
  return (
    <div className={styles.wrapper}>
      {!backtocart ? (
        <div className={styles.wrapper}>
          <div className={styles.header}> 
            <div className={styles.info}> 
              <div className={styles.title_container}>
                <h2 className={styles.user_title}>
                  Confirm order information
                </h2> 
              </div>
            </div> 
          </div> 
          {Object.keys(cartData).map((sellerId) => {
              const sellerData = cartData[sellerId];
              let sellerTotal = 0;
              return (
                <div key={sellerId} className={styles.list_video_wrapper}> 
                  <div className={styles.list_video_container}>
                    <div className={styles.list_video}>  
                      <div className={styles.title_wrapper}>
                        <p className={styles.title}>{sellerData.sellerName}</p> 
                        <p className={styles.title}></p>
                      </div>  
                      {sellerData.products && sellerData.products.map((product) => {
                        sellerTotal += product.productPrice * product.quantity;
                        totalAmount += sellerTotal;
                        return ( 
                            <div key={product.productId} className={styles.video_container}>
                              <Image 
                                src={product.productImg}  
                                className={styles.imgproduct}
                              />   
                              <div className={styles.product_container}> 
                                <div className={styles.product_name}>
                                  <p>{product.productName}</p>
                                </div> 
                                <div className={styles.product_price}>
                                  <p>Price: {product.productPrice}</p> 
                                </div> 
                                <div className={styles.product_price}>
                                  Quantity: {product.quantity}
                                </div>
                              </div>  
                            </div>  
                        );
                      }
                      )}
                      <div className={styles.footer_wrapper}>      
                        <p className={styles.footer}>Total: {sellerTotal}</p>  
                      </div> 
                      <div className={styles.noneline_wrapper}>      
                        <p className={styles.noneline}></p> 
                      </div> 
                    </div> 
                  </div>
                </div>
              ); 
            }
          )} 
          <div> 
            <div className={styles.address}>
              <h3 className={styles.subtitle}>Shipping Address</h3>
              {/* //nhấp dô nút này sẽ hiện form nhập address
              // !user.address ? (hiện form cho nhập addess, number phone) : (hiện thông tin address phone number) 
              // nếu bấm nút edit thì hiện form cho nhập address number phone
              //sau đó trả hiện lại address shiping 
              //có thể viết ra thành 1 component luôn rồi nữa có gì hiện lại thoi */}
              <Button outline large className={styles.button_edit} >  
                <FiEdit/>
              </Button>
            </div>
              <p className={styles.address_name}>{user.fullname}</p> 
              <p className={styles.address_detail}>{user.address}</p> 
              <p className={styles.address_phone}>{user.phone}</p> 
          </div>
          
          
          <div className={styles.header}>
            <h3>Total amount: {totalAmount}</h3>
          </div>

          <div className={styles.button_conf_cancle}>
            {/* //bấm nút Cancel thì hiện lại cart, thử coi được hogn, nếu hong được thì thử cách khác */}
            <Button outline large className={styles.button_cancle} onClick={() => backToCart()}> 
              Cancel 
            </Button> 
              {/* <Cart/> */}
            <Button outline large className={styles.button_conf} > 
              Confirm 
            </Button>  
          </div>
        </div>
    
        ) : (
          <Cart/>
        )}
    </div>
  );
}

export default Purchase;
