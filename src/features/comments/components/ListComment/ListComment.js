import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { commentService } from "~/features/comments/services/commentService";
import { getFullName } from "~/utils/common";
import Button from "../../../../components/Core/Button";
import Image from "../../../../components/Image";
import Loader from "../../../../components/Core/Loader";
import WrapperAuth from "../../../../components/WrapperAuth";
import styles from "./ListComment.module.scss";
import { FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";
import { config } from "~/config";
import handleLikeCommentFunc from "~/utils/handleLikeComment";
import { useSelector } from "react-redux";
import { videosService } from "~/features/videos/services/videosService";

function ListComment({ video }) {
  // console.log('video: ', video);
  const [listComment, setListComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const result = await commentService.getListComment(video._id);
      setListComment(result); 
      setLoading(false);
    };

    fetchApi();
  }, [video]);

  const handleComment = async () => {
    const result = await commentService.postComment(video._id, {
      comment: comment,
    });
    setComment("");
    setListComment((prev) => [result, ...prev]);

    setLoading(false);
  };
  //delete comment
  const deleteComment = async (comment) => { 
    setLoading(true);
    await commentService.deleteComment(comment._id); 
    setListComment((prev) => prev.filter((c) => {return c._id !== comment._id }));
    setLoading(false);
    // console.log('_id comment cần xóa: ', comment);

  };

  //Edit comment
  // const editComment = async (comment) => { 
  //   // await commentService.deleteComment(comment._id); 
  //   console.log('_id comment cần xóa: ', comment);

  // };





  // Delete a video
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate(); 
  const deleteVideo = async () => {
    if(user){ 
      if(video.user._id === undefined){
        if (user._id === video.user) {
          await videosService.deleteVideo(video._id);
          const userProfile = config.routes.profileLink(user.nickname);
          navigate(userProfile);
        }
      }
      else{
        if (user._id === video.user._id) {
          await videosService.deleteVideo(video._id);
          const userProfile = config.routes.profileLink(user.nickname);
          navigate(userProfile);
        }
      }
    } 
  };
 
  let buttonDelete = false;
  if(user){ 
    if(video.user._id === undefined){
      if (user._id === video.user) {
        buttonDelete = true;
      }
    }
    else{
      if (user._id === video.user._id) {
        buttonDelete = true;
      }
    }
  }
 
  const handleLikeComment = async (comment) => {  
    const newComment = await handleLikeCommentFunc(comment);
    // console.log('comment được thích: ', comment); 
    setListComment((prev) => prev.map((c) => c._id === newComment._id ? newComment : c));
    setLoading(false);
  };

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


  const onFormSubmit = (e) => {
    e.preventDefault();
    handleComment();
  };

  return (
    <div className={styles.content_container}>
      {buttonDelete ? (
          <Button type="submit" primary onClick={deleteVideo}>
            Delete Video
          </Button>
        ): (<div></div>) 
      }
      
      <div className={styles.comment_list_container}>
        {!loading ? (
          listComment ? (
            listComment.length > 0 ? (
              listComment.map((comment) => (
                <div className={styles.comment_item_container} key={comment._id}>
                  <div className={styles.comment_content_container}>
                    <Image src={comment.user.avatar} />
                    <div className={styles.comment_container}>
                      <Link
                        to={config.routes.profileLink(comment.user.nickname)}
                        className={styles.account_item}
                      >
                        <p className={styles.comment_user}>
                          {getFullName(comment.user)}
                        </p>
                      </Link>
                      <div>
                        {}
                      </div>
                      <p className={styles.comment_text}>{comment.comment}</p>
                      <p className={styles.created_at}>{formatDate(comment.createdAt)}</p>
                    </div>
                    <div className={styles.action_container}>
                      <div className={styles.like_wrapper}>
                        <div
                          className={
                            comment.is_liked
                              ? `${styles.icon} ${styles.liked}`
                              : `${styles.icon}`
                          }
                          onClick={() => handleLikeComment(comment)}
                        >
                          <FaRegHeart />
                        </div>
                        <span>{comment.likes_count}</span>
                      </div>
 
                      <div>
                        {user? (
                          (user._id === comment.user._id)?(
                            <div>
                              {/* <div className={styles.like_wrapper}>
                                <div onClick={() => editComment(comment)}>
                                  <FaEdit />
                                </div> 
                              </div>  */}
                              <div className={styles.like_wrapper}>
                                <div  onClick={() => deleteComment(comment)}>
                                  <FaTrash />
                                </div> 
                              </div>
                            </div> 
                          ):(<div></div>)
                        ) :(<div></div>)
                      }
                      </div> 

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noti_text}>No comment</p>
            )
          ) : (
            <p className={styles.noti_text}>Please login to see and comment</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      <WrapperAuth>
        <form onSubmit={onFormSubmit}>
          <div className={styles.bottom_comment_container}>
            <input
              type="text"
              placeholder="Add comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" primary>
              Post
            </Button>
          </div>
        </form>
      </WrapperAuth>
    </div>
  );
}

export default ListComment;
