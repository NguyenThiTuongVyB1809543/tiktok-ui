import { request } from "~/utils/axiosInstance";
 

 
export const suggestedList = async (page = 1, perpage = 5) => {
  try {
    const res = await request.get("users/suggested", {
      params: {
        page,
        per_page: perpage,
      },
    });
    // console.log(res);
    // return res.data;
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const followingList = async (page = 1) => {
  try {
    const res = await request.get("me/followings", {
      params: {
        page
      },
    });
    // console.log('res: ', res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const user = async (nickname) => {
  try {
    const res = await request.get(`users/@${nickname}`);
    // return res.data;
    return res;
  } catch (err) {
    console.log(err);
  }
};

export * as getUsersService from "~/features/accounts/services/getUsersService";
