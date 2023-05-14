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
import { getUsersOrderService } from "~/features/orders/services/getUsersOrderService";
import { cartService } from "~/features/carts/services/cartService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa"; 
import { config } from "~/config";   
import Purchase from "~/pages/Purchase";
import axios from "axios";  
function PurchaseHistory() {
  const srcAvatar = "src/assets/images/";
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  const usercurrent = user3.data;
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(false);

  const [purchaseHistory , setPurchaseHistory ] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersOrderService.getUserPurchaseHistory();
      setPurchaseHistory(result);
      // console.log('result: ',result);
      setLoading(false);
    };
    fetchApi();
  }, []); 
  // console.log('cart data: ', Object.entries(cartData).length === 0);
  console.log('purchaseHistory', purchaseHistory)
    
  return ( 
    <div className={styles.wrapper}>  
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.title_container}>
            <h2 className={styles.user_title}>Your purchase history</h2>
          </div>
        </div>
      </div>
      {Object.keys(purchaseHistory).map((sellerId) => {
        const sellerData = purchaseHistory[sellerId];  
        return (
          <div key={sellerId} className={styles.list_video_wrapper}>
            <div className={styles.list_video_container}>
              <div className={styles.list_video}>
                <div className={styles.title_wrapper}>
                  <Link to={config.routes.boothLink(sellerData.seller.nickname)}>
                    <p className={styles.title}>
                      {sellerData.seller.fullname}
                    </p> 
                  </Link> 
                  <p className={styles.title}></p>
                </div>
                {sellerData.products &&
                  sellerData.products.map((product) => { 
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
                            <p>Price: {product.price}</p>
                          </div>
                          <div className={styles.product_price}>
                            <p>Quantity: {product.quantity}</p>
                          </div>
                           
                        </div>
                        {/* <div className={styles.product_number}>
                          Quantity:{product.quantity}
                        </div> */}
                      </div>
                    );
                  })}
                 
                 <div className={styles.footer_wrapper}>
                    <p className={styles.footer}>Total: {sellerData.totalPrice}</p>
                    <p className={styles.footer_status}>Status: {sellerData.status}</p>
                  </div>
                  <div className={styles.noneline_wrapper}>
                    {/* <Button outline large >
                      Checkout
                    </Button> */}
                    <p className={styles.noneline}></p>
                  </div> 
              </div>
            </div>
          </div>
        );
      })}  
    </div>
 
  );
}

export default PurchaseHistory;
