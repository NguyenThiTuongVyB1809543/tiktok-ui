import { request } from "~/utils/axiosInstance";

export const follow = async (_id) => {
  try {
    const res = await request.post(`users/${_id}/follow`, _id);
    // console.log('follow: ', res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const unfollow = async (_id) => {
  try {
    const res = await request.post(`users/${_id}/unfollow`, _id);
    console.log('res: ', res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

export * as followService from "~/features/accounts/services/postFollowService";
