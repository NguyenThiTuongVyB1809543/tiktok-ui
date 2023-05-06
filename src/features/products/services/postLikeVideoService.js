import { request } from "~/utils/axiosInstance";

export const like = async (_id) => {
  try {
    const res = await request.post(`videos/${_id}/like`, _id);
    // console.log('like: ', res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const unlike = async (_id) => {
  try {
    const res = await request.post(`videos/${_id}/unlike`, _id);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export * as likeService from "~/features/videos/services/postLikeVideoService";
