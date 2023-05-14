import { request } from "~/utils/axiosInstance";
   

export const getUserPurchaseHistory = async () => {
  try {
    const res = await request.get(`orders/purchase_history`);
      // console.log('res: ',res);
      // return res.data;
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const getUserOrders = async () => {
  try {
    const res = await request.get(`orders`);
      // console.log('res: ',res);
      // return res.data;
    return res;
  } catch (err) {
    console.log(err);
  }
};


export * as getUsersOrderService from "~/features/orders/services/getUsersOrderService";
