import { request } from "~/utils/axiosInstance";

export const like = async (_id) => {
  try {
    const res = await request.post(`comments/${_id}/like`, _id);
    console.log('like: ', res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const unlike = async (_id) => {
  try {
    const res = await request.post(`comments/${_id}/unlike`, _id);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export * as likeCommentService from "~/features/comments/services/postLikeCommentService";
