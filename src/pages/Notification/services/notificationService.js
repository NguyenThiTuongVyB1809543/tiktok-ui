import { request } from "~/utils/axiosInstance";

export const getListNotification = async () => {
  try {
    const res = await request.get(`notifications`);
    // console.log('res: ', res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
 
 

export * as notificationService from "~/pages/Notification/services/notificationService";
