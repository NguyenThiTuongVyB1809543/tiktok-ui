import { likeCommentService } from "~/features/comments/services/postLikeCommentService";

const handleLikeCommentFunc = async (comment) => {
  let newComment;
  // console.log('comment._id được thích:', comment._id);

  if (comment && comment.is_liked) {
    newComment = await likeCommentService.unlike(comment._id);
  } else {
    newComment = await likeCommentService.like(comment._id);
  }
  // console.log('newComment123:', newComment);
  return newComment;
};

export default handleLikeCommentFunc;
