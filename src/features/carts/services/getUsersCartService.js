import { request } from "~/utils/axiosInstance";
  
// export const followingList = async (page = 1) => {
//   try {
//     const res = await request.get("me/followings", {
//       params: {
//         page
//       },
//     });
//     // console.log('res: ', res);
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// }; 

export const getUserCart = async () => {
  try {
    const res = await request.get(`carts`);
    // return res.data;
    return res;
  } catch (err) {
    console.log(err);
  }
};


export * as getUsersCartService from "~/features/carts/services/getUsersCartService";
