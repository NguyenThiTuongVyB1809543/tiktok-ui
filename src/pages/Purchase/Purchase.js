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

// import Loader from "~/components/Core/Loader";
import WrapperAuth from "~/components/WrapperAuth";
import handleFollowFunc from "~/utils/handleFollow";
import { getUsersService } from "~/features/accounts/services/getUsersService";
import { orderService } from "~/features/orders/services/orderService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";   
import axios from "axios";  
import EditAddress from "~/pages/EditAddress"; 

import { useNavigate } from "react-router-dom";

import Error from "~/components/Core/Error";
import Loader from "~/components/Core/Loader"; 

function Purchase(cartdata) {
  const srcAvatar = "src/assets/images/";
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  // console.log('user', user3.data._id);
  const usercurrent = user3.data;
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate(); 
  const [backtocart, setBackToCart] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [editaddress, setEditAddress] = useState(false);

  const [cartData , setCartData ] = useState(cartdata.cartdata);
   

   
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersService.currentUser(user3.data._id);
      setUser(result); 
    };

    fetchApi();
  }, []);
  // console.log('backToCart: ', backToCart);

  const confirmOrder = async () => {
    await orderService.confirmOrder();  
    navigate("/");
  };

   
  let totalAmount = 0;
  const backToCart  = async () => {
    setBackToCart(true);
  };
  
  const editAddress  = async () => {
    setEditAddress(true);
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
              <Button outline large className={styles.button_edit} onClick={() => editAddress()} >  
                <FiEdit/>
              </Button>
              
            </div>

              <p className={styles.address_name}>{user.fullname}</p> 
               
            <div>
              {editaddress ? (
                <EditAddress user={user} />
              ) : (
                <div></div>
              )}
            </div>
              


              <div>
                {!user.address ? (
                  <Error>You do not have information about address</Error>
                  ) : (
                    <p className={styles.address_detail}>{user.address}</p> 
                  )
                }
              </div>
              <div>
                {!user.phone ? (
                  <Error>You do not have information about phone number</Error>
                  ) : (
                    <p className={styles.address_phone}>{user.phone}</p> 
                  )
                }
              </div>

          </div>
          
          
          <div className={styles.header}>
            <h3>Total amount: {totalAmount}</h3>
          </div>

          <div className={styles.button_conf_cancle}>
            {/* //bấm nút Cancel thì hiện lại cart, thử coi được hogn, nếu hong được thì thử cách khác */}
            <Button outline large className={styles.button_cancle} onClick={() => backToCart()}> 
              Cancel 
            </Button>  
              
            <Button 
              outline 
              large 
              className={styles.button_conf}  
              disabled={!user.address || !user.phone}
              onClick={() => confirmOrder()}
            > 
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
