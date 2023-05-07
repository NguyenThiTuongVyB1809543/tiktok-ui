import { request } from "~/utils/axiosInstance";

export const getListProduct = async () => {
  try {  
    const res = await request.get("products/show", {
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
     
    const res = await request.get(`products/${id}`);

    return res ;
  } catch (err) {
    console.log(err);
  }
};

export const postProduct = async (formData) => {
  try {
    console.log('formData của postProduct: ',formData);
    await request.post("products", formData  ); 
    // const res = await request.post("products", formData  );  
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

export * as productService from "~/features/products/services/productService";
