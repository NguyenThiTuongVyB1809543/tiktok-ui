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

export const userProduct = async (nickname) => {
  try {
    const res = await request.get(`users/@${nickname}/products`);
    // return res.data;
    return res;
  } catch (err) {
    console.log(err);
  }
};


export * as getUsersProductService from "~/features/products/services/getUsersProductService";
