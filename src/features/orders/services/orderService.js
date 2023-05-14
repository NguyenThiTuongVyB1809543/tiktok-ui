import { request } from "~/utils/axiosInstance";

// export const getListCart = async () => {
//   try {  
//     const res = await request.get("carts/show", {
//           params: {
//             type,
//             page,
//           },
//         });
//     return res; 
    
//   } catch (err) {
//     console.log(err);
//   }
// };
  
// export const getProduct = async (id) => {
//   try {
     
//     const res = await request.get(`cart/${id}`);

//     return res ;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const orderApproval = async (id) => {
  try {
    // console.log("id: ", id);
     await request.post(`orders/${id}`, id); 
    // console.log(res); 
    // return res ; 
  } catch (err) {
    console.log(err);
  }
};

// export const increaseProductQuantityCart = async (product) => {
//   try {
//     // console.log('increaseProductQuantityCart: ',product);
//     await request.post("carts/inc_quantity", product); 
//     // const res = await request.post("products", formData );  
//     // return res ;

//   } catch (err) {
//     console.log(err);
//   }
// };
export const confirmOrder = async () => {
  try { 
    const res =  await request.post("orders");   
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}; 

export const deleteProductCart = async (product) => {
  try {
    await request.post(`carts/del_product_cart`, product);

  } catch (err) {
    console.log(err);
  }
};

export * as orderService from "~/features/orders/services/orderService";
