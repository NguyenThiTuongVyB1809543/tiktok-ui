import { request } from "~/utils/axiosInstance";
  
export const productList = async () => {
  try {
    const res = await request.get("me/followings/products" );
    // console.log('res: ', res);
    return res;
  } catch (err) {
    console.log(err);
  }
}; 

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
