import { request } from "~/utils/axiosInstance";

export const getListCart = async () => {
  try {  
    const res = await request.get("carts/show", {
          params: {
            type,
            page,
          },
        });
    return res; 
    
  } catch (err) {
    console.log(err);
  }
};
  
export const getProduct = async (id) => {
  try {
     
    const res = await request.get(`cart/${id}`);

    return res ;
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (product) => {
  try {
    console.log('addToCart: ',product);
    await request.post("carts", product); 
    // const res = await request.post("products", formData );  
    // return res ;

  } catch (err) {
    console.log(err);
  }
};
export const editProduct = async (formData) => {
  try {
    console.log('formData của editProduct: ',formData);
    await request.post("products/edit", formData  ); 
    // const res = await request.post("products", formData  );  
    // return res ;

  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (id) => {
  try {
    await request.remove(`products/${id}`);

  } catch (err) {
    console.log(err);
  }
};

export * as cartService from "~/features/carts/services/cartService";
