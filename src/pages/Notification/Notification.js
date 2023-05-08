import React, { useEffect, useState } from "react";
// import styles from "./Profile.module.scss"; 
import { Link, useParams } from "react-router-dom"; 
import Image from "../../components/Image"; 
import Loader from "~/components/Core/Loader";
import WrapperAuth from "~/components/WrapperAuth"; 
import styles from "./ListComment.module.scss"; 
import { FaRegHeart, FaEdit, FaTrash } from "react-icons/fa"; 
import handleLikeCommentFunc from "~/utils/handleLikeComment"; 
import { videosService } from "~/features/videos/services/videosService";  
import { getUsersService } from "~/features/accounts/services/getUsersService";
import { getFullName } from "~/utils/common";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { config } from "~/config";   
import axios from "axios";
import { notificationService } from "~/pages/Notification/services/notificationService"; 
 
function Notification() {
  const user2 = localStorage.getItem("user"); 
  const user3 = JSON.parse(user2); 
  const usercurrent = user3.data;
  // console.log('usercurrent: ', usercurrent);

  const [listNotification, setListNotification] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log('loading: ', loading);
  const [notification, setNotification] = useState("");

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const result = await notificationService.getListNotification(usercurrent._id);
  //     setListNotification(result); 
  //     console.log('listNotification: ',listNotification);
  //     setLoading(false);
  //   }; 
  //   fetchApi();
  // }, []); 

  useEffect(() => {
    const fetchApi = async () => {
      const result = await notificationService.getListNotification();
      setListNotification(result);
      
      setLoading(false);
    };
    fetchApi();
  }, []);
  // console.log('listNotification: ',listNotification);

  
  // const handleReadNotification = async (notification) => {  
  //   const newNotification = await handleReadNotificationFunc(notification);
  //   // console.log('notification được thích: ', notification); 
  //   setListNotification((prev) => prev.map((c) => c._id === newNotification._id ? newNotification : c));
  //   setLoading(false);
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }



  const renderNotification = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          // <Link
          // to={`${config.routes.profileLink(notification.fromUser.nickname)}/videos/${notification.video._id}`} 
          //   className={styles.account_item}
          // >   
          //   <div>  
          //     <p className={styles.comment_text}>
          //       <Link
          //         to={config.routes.profileLink(notification.fromUser.nickname)}
          //         className={styles.account_item}
          //       >  
          //           {getFullName(notification.fromUser)}&nbsp;
          //       </Link> 
          //       đã thích video của bạn
          //     </p>
          //   </div>
          // </Link> 
          
          <div> 
            <Link  to={config.routes.videoLink(notification.video)}  >
              <p className={styles.comment_text}>
              {/* {config.routes.videoLink(notification.video)} */}
              {/* {config.routes.profileLink(notification.fromUser.nickname)} */}
                <Link
                  to={config.routes.profileLink(notification.fromUser.nickname)}
                  className={styles.account_item}
                >  
                    {getFullName(notification.fromUser)}&nbsp;
                </Link> 
                đã thích video của bạn
              </p>
            </Link> 
          </div>
        );
      case "comment":
        return (
          
          <div>  
            
            

            <Link  to={config.routes.videoLink(notification.video)}  >
              <p className={styles.comment_text}>
                  <Link
                  to={config.routes.profileLink(notification.fromUser.nickname)}
                  className={styles.account_item}
                >  
                    {getFullName(notification.fromUser)}&nbsp;
                </Link> 
                đã commnent video của bạn 
              </p>
              
            </Link>
              
          </div>
           
        );
      case "follow":
        return (
          
          <div>  
            <p className={styles.comment_text}>
              <Link
                to={config.routes.profileLink(notification.fromUser.nickname)}
                className={styles.account_item}
              >  
                  {getFullName(notification.fromUser)}&nbsp;
              </Link> 
              đã follow bạn
             </p>
          </div>
           
        );
      case "like_comment":
        return (
          <div>  
            <p className={styles.comment_text}>
              <Link
                to={config.routes.profileLink(notification.fromUser.nickname)}
                className={styles.account_item}
              >  
                  {getFullName(notification.fromUser)}&nbsp;
              </Link> 
              đã thích comment của bạn
             </p>
          </div>
           
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.content_container}> 
      <div className={styles.comment_list_container}>
        {!loading ? (
          listNotification ? (
            listNotification.length > 0 ? (
              listNotification.map((notification) => (
                <div className={styles.comment_item_container} key={notification._id}>
                  <div className={styles.comment_content_container}>
                    <Image src={notification.fromUser.avatar} />
                    <div className={styles.comment_container}>
                      <Link
                        to={config.routes.profileLink(notification.fromUser.nickname)}
                        className={styles.account_item}
                      >    
                      </Link>
                        {renderNotification(notification)} 
                        <p className={styles.created_at}>{formatDate(notification.createdAt)}</p> 
                    </div>
                    <div className={styles.action_container}>
                      <div className={styles.like_wrapper}>
                         
                      </div> 
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noti_text}>No notification</p>
            )
          ) : (
            <p className={styles.noti_text}>Please login to see notification</p>
          )
        ) : (
          <Loader />
        )} 
      </div>
       
    </div>
  );
}

export default Notification;
