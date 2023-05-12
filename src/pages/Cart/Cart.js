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
import { cartService } from "~/features/carts/services/cartService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";   
import Purchase from "~/pages/Purchase";
import axios from "axios";  
function Cart() {
  const srcAvatar = "src/assets/images/";
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  const usercurrent = user3.data;
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(false);

  const [cartData , setCartData ] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersCartService.getUserCart();
      setCartData(result);
      // console.log('result: ',result);
      setLoading(false);
    };
    fetchApi();
  }, []); 
  // console.log('cart data: ', Object.entries(cartData).length === 0);

   
  const increaseProductQuantity = async (product) => {
    await cartService.increaseProductQuantityCart(product);
    const fetchApi = async () => {
      const result = await getUsersCartService.getUserCart();
      setCartData(result); 
    };
    fetchApi();
    setLoading(false);  
  };

  const decreaseProductQuantity = async (product) => {
    await cartService.decreaseProductQuantityCart(product);
    const fetchApi = async () => {
      const result = await getUsersCartService.getUserCart();
      setCartData(result); 
    };
    fetchApi();
    setLoading(false);  
  }; 
  let totalAmount = 0;

  const deleteProductCart = async (product) => {
    await cartService.deleteProductCart(product);
    const fetchApi = async () => {
      const result = await getUsersCartService.getUserCart();
      setCartData(result); 
    };
    fetchApi();
    setLoading(false);  
  };

  const startPurchase  = async () => {
    setPurchase(true);
  };


  return (
    <div className={styles.wrapper}>

        {!purchase ? (
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div className={styles.info}>
                <div className={styles.title_container}>
                  <h2 className={styles.user_title}>Your Cart</h2>
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
                      {sellerData.products &&
                        sellerData.products.map((product) => {
                          sellerTotal += product.productPrice * product.quantity;
                          totalAmount += sellerTotal;
                          return (
                            <div
                              key={product.productId}
                              className={styles.video_container}
                            >
                              <Image
                                src={product.productImg}
                                className={styles.imgproduct}
                              />
                              <div className={styles.product_container}>
                                <div className={styles.product_name}>
                                  <p>{product.productName}</p>
                                </div>
                                <div className={styles.product_desc}>
                                  <p>
                                    Description: {product.productDescription}
                                  </p>
                                </div>
                                <div className={styles.product_price}>
                                  <p>Price: {product.productPrice}</p>
                                </div>
                              </div>
                              <div className={styles.product_action}>
                                <Button
                                  outline
                                  large
                                  onClick={() => increaseProductQuantity(product)}
                                >
                                  <BsPlusCircle />
                                </Button>
    
                                <Button
                                  outline
                                  large
                                  onClick={() => decreaseProductQuantity(product)}
                                >
                                  <FiMinusCircle />
                                </Button>
    
                                <Button
                                  outline
                                  large
                                  onClick={() => deleteProductCart(product)}
                                >
                                  <BsTrash />
                                </Button>
                              </div>
                              <div className={styles.product_number}>
                                {product.quantity}
                              </div>
                            </div>
                          );
                        })}
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
            })}
          
            {Object.entries(cartData).length !== 0 ? (
              <Button outline large onClick={() => startPurchase()}>
                Checkout
              </Button>
            ) : (
              <h3>Your shopping cart is empty, browse around to find what you like</h3>
            )}
          </div>
          ) : (
            <Purchase cartdata = {cartData}/>
          )
        }
    </div>
  // <div className={styles.wrapper}>
  //   <div className={styles.header}> 
  //     <div className={styles.info}> 
  //       <div className={styles.title_container}>
  //         <h2 className={styles.user_title}>
  //           Your Cart 
  //         </h2> 
  //       </div>
  //     </div> 
  //   </div> 
  //   {Object.keys(cartData).map((sellerId) => {
  //       const sellerData = cartData[sellerId];
  //       let sellerTotal = 0;
  //       return (
  //         <div key={sellerId} className={styles.list_video_wrapper}> 
  //           <div className={styles.list_video_container}>
  //             <div className={styles.list_video}>  
  //               <div className={styles.title_wrapper}>
  //                 <p className={styles.title}>{sellerData.sellerName}</p> 
  //                 <p className={styles.title}></p>
  //               </div>  
  //               {sellerData.products && sellerData.products.map((product) => {
  //                 sellerTotal += product.productPrice * product.quantity;
  //                 totalAmount += sellerTotal;
  //                 return ( 
  //                     <div key={product.productId} className={styles.video_container}>
  //                       <Image 
  //                         src={product.productImg}  
  //                         className={styles.imgproduct}
  //                       /> 
  //                       <div className={styles.product_container}> 
  //                         <div className={styles.product_name}>
  //                           <p>{product.productName}</p>
  //                         </div>
  //                         <div className={styles.product_desc}>
  //                           <p>Description: {product.productDescription}</p>   
  //                         </div>
  //                         <div className={styles.product_price}>
  //                           <p>Price: {product.productPrice}</p>
                            
  //                         </div> 
  //                       </div> 
  //                       <div className={styles.product_action}>
  //                         <Button outline large onClick={() => increaseProductQuantity(product)}> 
  //                           <BsPlusCircle />
  //                         </Button> 
                          
  //                         <Button outline large onClick={() => decreaseProductQuantity(product)}> 
  //                           <FiMinusCircle />
  //                         </Button>
    
  //                         <Button outline large onClick={() => deleteProductCart(product)}> 
  //                           <BsTrash />
  //                         </Button> 
  //                       </div>
  //                       <div className={styles.product_number}>
  //                         {product.quantity}
  //                       </div> 
  //                     </div>  
  //                 );
  //               }
  //               )}
  //               <div className={styles.footer_wrapper}>      
  //                 <p className={styles.footer}>Total: {sellerTotal}</p>  
  //               </div> 
  //               <div className={styles.noneline_wrapper}>      
  //                 <p className={styles.noneline}></p> 
  //               </div> 
  //             </div> 
  //           </div>
  //         </div>
  //       );
        
  //     }
  //   )}
  //   {Object.entries(cartData).length !== 0 ? (
  //     <Button outline large  onClick={() => startPurchase ()}> 
  //       Checkout 
  //     </Button> 
  //   ) : (
  //     <h3>Your shopping cart is empty, browse around to find what you like</h3>
  //   )}
    
     
       
     
  // </div>
  );
}

export default Cart;
