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
import { getUsersOrderService } from "~/features/orders/services/getUsersOrderService";
import {orderService} from "~/features/orders/services/orderService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";   
import Purchase from "~/pages/Purchase";
import axios from "axios";  
function Orders() {
  const srcAvatar = "src/assets/images/";
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  const usercurrent = user3.data;
  const [loading, setLoading] = useState(true);

  const [orders , setOrders ] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersOrderService.getUserOrders();
      setOrders(result);
      // console.log('result: ',result);
      setLoading(false);
    };
    fetchApi();
  }, []); 

  const orderApproval = async (orderId) => {
    // console.log('orderId: ', orderId); 
    await orderService.orderApproval(orderId); 
    const fetchApi = async () => {
      const result = await getUsersOrderService.getUserOrders();
      setOrders(result); 
    };
    fetchApi();
    setLoading(false);  
  };



  console.log('orders', orders); 
  return (
    <div className={styles.wrapper}>  
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.title_container}>
            <h2 className={styles.user_title}>Your orders</h2>
          </div>
        </div>
      </div>

      {Object.keys(orders).map((buyer) => {
        const buyerData = orders[buyer];
        // let sellerTotal = 0;
        return (
          <div key={buyerData._id} className={styles.list_video_wrapper}>
            <div className={styles.list_video_container}>
              <div className={styles.list_video}>
                <div className={styles.title_wrapper}>
                  <Link to={config.routes.profileLink(buyerData.user.nickname)}>
                    <p className={styles.title}>
                      {buyerData.user.fullname}
                    </p> 
                  </Link> 
                </div>
                <p className={styles.title}>Address: {buyerData.user.address}</p>
                <p className={styles.title}>Phone Number: {buyerData.user.phone}</p>
                {buyerData.products &&
                  buyerData.products.map((product) => {
                     
                    return (
                      <div
                        key={product.product._id}
                        className={styles.video_container}
                      >
                        <Image
                          src={product.product.product_img_url}
                          className={styles.imgproduct}
                        />
                        <div className={styles.product_container}>
                          <div className={styles.product_name}>
                            
                            <p>{product.product.product_name}</p>
                          </div>
                          <div className={styles.product_desc}>
                            <p>
                              Description: {product.product.description}
                            </p>
                          </div>
                          <div className={styles.product_price}>
                            <p>Price: {product.product.price}</p>
                          </div>
                          <div className={styles.product_price}>
                            <p>Quantity: {product.quantity}</p>
                          </div>
                        </div>
                         
                        {/* <div className={styles.product_number}>
                          {product.quantity}
                        </div> */}
                      </div>
                    );
                  })}

                  <div className={styles.footer_wrapper}>
                    <div className={styles.footer_one}>
                      <p className={styles.footer}>Total: {buyerData.totalPrice}</p>
                      <p className={styles.footer_status}>Status: {buyerData.status}</p>
                    </div>
                    <div className={styles.footer_two}>
                      <Button outline large onClick={() => orderApproval(buyerData._id)}>
                        Approve
                      </Button>
                    </div>
                  </div>
                  
                <div className={styles.noneline_wrapper}>
                  <p className={styles.noneline}></p> 
                </div>
              </div>
            </div>
          </div>
        );
      })}
    
      {/* {Object.entries(cartData).length !== 0 ? (
        <Button outline large onClick={() => startPurchase()}>
          Checkout
        </Button>
      ) : (
        <h3>Your shopping cart is empty, browse around to find what you like</h3>
      )} */} 
    </div>
   
  );
}

export default Orders;
