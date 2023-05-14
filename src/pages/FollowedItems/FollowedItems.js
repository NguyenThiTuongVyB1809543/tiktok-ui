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
import { BsCartPlus } from "react-icons/bs";


import Loader from "~/components/Core/Loader";
import WrapperAuth from "~/components/WrapperAuth";
import handleFollowFunc from "~/utils/handleFollow";
import { getUsersCartService } from "~/features/carts/services/getUsersCartService";
import { cartService } from "~/features/carts/services/cartService";
import { getUsersProductService } from "~/features/products/services/getUsersProductService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";   
import Purchase from "~/pages/Purchase";
import axios from "axios";  
function FollowedItems() {
  const srcAvatar = "src/assets/images/";
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  const usercurrent = user3.data;
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(false);

  // const [cartData , setCartData ] = useState({});
  const [productList , setProductList ] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersProductService.productList();
      setProductList(result);
      // console.log('result: ',result);
      setLoading(false);
    };
    fetchApi();
  }, []); 
  console.log('productList: ', productList)


  const addToCart = async (product) => { 
     
    await cartService.addToCart(product);  
    setLoading(false); 
  };
  // console.log('cart data: ', Object.entries(cartData).length === 0);

   
  // const increaseProductQuantity = async (product) => {
  //   await cartService.increaseProductQuantityCart(product);
  //   const fetchApi = async () => {
  //     const result = await getUsersCartService.getUserCart();
  //     setCartData(result); 
  //   };
  //   fetchApi();
  //   setLoading(false);  
  // };

  // const decreaseProductQuantity = async (product) => {
  //   await cartService.decreaseProductQuantityCart(product);
  //   const fetchApi = async () => {
  //     const result = await getUsersCartService.getUserCart();
  //     setCartData(result); 
  //   };
  //   fetchApi();
  //   setLoading(false);  
  // }; 
  // let totalAmount = 0;

  // const deleteProductCart = async (product) => {
  //   await cartService.deleteProductCart(product);
  //   const fetchApi = async () => {
  //     const result = await getUsersCartService.getUserCart();
  //     setCartData(result); 
  //   };
  //   fetchApi();
  //   setLoading(false);  
  // };

  // const startPurchase  = async () => {
  //   setPurchase(true);
  // };


  return (
    <div className={styles.wrapper}> 
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.title_container}>
              <h2 className={styles.user_title}></h2>
            </div>
          </div>
        </div>

        {Object.keys(productList).map((productId) => {
          const productData = productList[productId];
          return ( 
            <div key={productId} className={styles.list_video_wrapper}>
              <div className={styles.list_video_container}>
                <div className={styles.list_video}>
                  <div className={styles.title_wrapper}>
                    {/* <Link to={config.routes.boothLink(sellerData.sellerNickname)}> */}
                    <Link to="">
                      <p className={styles.title}>
                        {productData.user.fullname} 
                      </p> 
                    </Link> 
                    <p className={styles.title}></p>
                  </div>  
                
                  <div
                    // key={product.productId}
                    key="{product.productId}"
                    className={styles.video_container}
                  >
                    <Image
                      src={productData.product_img_url}
                      // src={srcAvatar + "linh.JPG"}
                      className={styles.imgproduct}
                    />
                    <div className={styles.product_container}>
                      <div className={styles.product_name}>
                        
                        <p>{productData.product_name}</p>
                        {/* <p>Tên sản phẩm</p> */}
                      </div>
                      <div className={styles.product_desc}>
                        <p>
                          Description: {productData.description}
                          
                        </p>
                      </div>
                      <div className={styles.product_price}>
                        <p>Price: {productData.price}</p>
                        {/* <p>Price:  </p> */}
                      </div>
                    </div>
                    <div className={styles.product_action}> 
                      <Button outline large onClick={() => addToCart(productData)}> 
                      {/* <Button outline large  >  */}
                        <Tippy content="Add to cart" placement="bottom">
                          <div className={styles.product_cartbtn}>
                            <BsCartPlus />
                          </div>
                        </Tippy> 
                      </Button>   
                    </div>
                    <div className={styles.product_number}>
                      {/* {product.quantity} */}
                      
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>
          );

        })}

            
         
         
          
      
          
      </div>
        
    </div> 
  );
}

export default FollowedItems;
