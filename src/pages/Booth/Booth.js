import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { Link, useParams } from "react-router-dom"; 
import Verify from "~/assets/images/verify.svg";
import Tippy from "@tippyjs/react";
import Image from "./../../components/Image";
import Button from "~/components/Core/Button";
import Loader from "~/components/Core/Loader";
import WrapperAuth from "~/components/WrapperAuth";
import handleFollowFunc from "~/utils/handleFollow";
import { getUsersProductService } from "~/features/products/services/getUsersProductService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import {  FaRegPlusSquare } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

import { config } from "~/config";  

import axios from "axios";
   

function Booth() { 
  const { user: userRedux } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const nickname = params.nickname;

  const user1 = localStorage.getItem("user"); 
  const user2 = JSON.parse(user1); 

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUsersProductService.userProduct(nickname);
      setUser(result);
      setLoading(false);
    };

    fetchApi();
  }, [nickname, userRedux, user.is_followed]);

    
  const handleFollow = async () => {
    const isFollowed = await handleFollowFunc(user); 
    setUser(prevUser => ({ ...prevUser, is_followed: isFollowed })); 
  };
  useEffect(() => {
    // console.log('user is_followed: ', user.is_followed);
  }, [user]);

  if (loading) {
    return <Loader />;
  }
  const srcAvatar = "src/assets/images/"; 
 

  

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        
        <div className={styles.info}>
          <Image
            src={user.avatar} 
            width={116}
            height={116}
            className={styles.avatar}
          />
          <div className={styles.title_container}>
            <h2 className={styles.user_title}>
              {user.nickname}  
              {user.tick && <Image src={Verify} className={styles.verify} />}
            </h2>

            <h4 className={styles.user_fullname}>
              {getFullName(user)}  
            </h4> 

            {userRedux?._id !== user?._id ? (
              <WrapperAuth>
                <div className={styles.button_container}>
                  {user.is_followed ? (
                    <div className={styles.followed_container}>
                      <Link to={config.routes.profileLink(user.nickname)}>
                        <Button outline large>
                          Profile
                        </Button>
                      </Link> 
                    </div>
                  ) : (
                    <Button
                      large
                      className={styles.button_follow}
                      onClick={handleFollow}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              </WrapperAuth>
            ) : 
            ( 
              <div className={styles.button_container}  >
                  <Button outline large leftIcon={<FaRegPlusSquare />} >
                      <Link  to={config.routes.addProductLink(user.nickname)}  >
                          Add Product
                      </Link>
                  </Button>   
              </div>
            )}
          </div>
        </div>

        <h2 className={styles.count_info}>
          <div className={styles.number_container}>
            <strong>{user.products_count}</strong>
            {/* <strong>12</strong> */}
            <span>Products</span>
          </div> 
        </h2>
        
        <h2 className={styles.bio}>{user.bio || "No booth introduction."}</h2>
        {/* <h2 className={styles.bio}>{ "Ở đây em có bán cả thế giới" || "No booth introduction."}</h2> */}
         
      </div>
      <div className={styles.list_video_wrapper}>
        <div className={styles.title_wrapper}>
          <p className={styles.title}>Product</p> 
          <p className={styles.title}></p>
        </div>
        <div className={styles.list_video_container}>
          <div className={styles.list_video}> 
            {user?.products?.map((product) => ( 
                <div className={styles.video_container} key={product._id}>
                  <Image
                    src={product.product_img_url}   
                    className={styles.imgproduct}
                  />
                    <div className={styles.product_name}>
                      <p>{product.product_name}</p>
                    </div>
                    <div className={styles.product_desc}>
                      <p>{product.description}</p>
                    </div>
                    <div className={styles.product_price}>
                      <p>Giá: {product.price}</p>
                    </div>
                    {userRedux?._id !== user?._id ? (
                      <div className={styles.product_button_container}>
                        <div className={styles.product_button}>
                          <Button outline large> 
                            <Tippy content="Edit" placement="bottom"> 
                                <BsCartPlus /> 
                            </Tippy> 
                          </Button> 
                        </div>
                        <div className={styles.product_button }>
                          <Button outline large> 
                            <Tippy content="Delete" placement="bottom"> 
                                <BsCartPlus /> 
                            </Tippy> 
                          </Button> 
                        </div>
                      </div>  
                    ):(
                      <Button outline large> 
                        <Tippy content="Add to cart" placement="bottom">
                          <div className={styles.product_cartbtn}>
                            <BsCartPlus />
                          </div>
                        </Tippy> 
                      </Button> 

                    )}
                </div>
            ))} 
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Booth;
