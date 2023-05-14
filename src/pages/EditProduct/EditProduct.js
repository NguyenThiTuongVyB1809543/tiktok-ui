import React, { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams  } from "react-router-dom";
import Button from "~/components/Core/Button";
import Loader from "~/components/Core/Loader";
import { UploadIcon } from "~/components/Icons";
import { productService } from "~/features/products/services/productService"; 
import styles from "./Upload.module.scss";
import Image from "./../../components/Image"; 


function EditProduct() {
  const [filePreview, setFilePreview] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [namefile, setNameFile] = useState("");
  const [price, setPrice] = useState(""); 
  const navigate = useNavigate(); 
  const [productName, setProductName] = useState("");  
  const user1 = localStorage.getItem("user"); 
  const user = JSON.parse(user1); 
  const [selectedFile, setSelectedFile] = useState(null);
  const  params  = useParams();
  const  productId  = params.id;
  const [product, setProduct] = useState();
  const [initialValues, setInitialValues] = useState({
    productName: '',
    description: '',
    price: '',
    namefile: ''
  });
  useEffect(() => {
    const fetchApi = async () => {
      const result = await productService.getProduct(productId);
      setProduct(result); 
      setInitialValues({
        productName: result.product_name || '',
        description: result.description || '',
        price: result.price || '',
        namefile: result.product_img_url || '',
      });
    };
    
    fetchApi();
  }, []); 
   

  const handleFile = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    const namefile = e.target.files[0].name;
    setNameFile(namefile);
    // console.log('e.target.files[0] :   ', e.target.files[0] );
    setFilePreview(src);
    setFile(e.target.files[0]);
  };
  // console.log('đây là initialValues.price: ', initialValues.price);
  const handleEditProduct = async (data) => {
    // setIsLoading(true);
    await productService.editProduct(data);
    // console.log(data);
    // setIsLoading(false);
    
  };
 
  const submitForm = (data) => { 
    const fullData = { ...data, namefile, userId: user.data._id, productId: productId  };   
    // console.log('fullData:  ', fullData);

    handleEditProduct(fullData);
    navigate(`/@${user.data.nickname}/booth`);
  };
  // console.log('namefile:  ', namefile);
  // console.log('description:  ', description);
  // console.log('productName:  ', productName);
  // console.log('price:  ', price);
  // const srcProduct = "src/assets/images/";
   
  return (
    <form  initialValues={initialValues}  onSubmit={handleSubmit(submitForm)} className={styles.upload_wrapper}>
      <div className={styles.upload_container}>
        <span className={styles.upload_title}>Edit product</span>
        <div className={styles.upload_sub_title}>
          <span>Edit your product</span>
        </div>
        <div className={styles.upload_content}>
          <div
            className={
              file ? `${styles.preview}` : `${styles.upload_content_left}`
            }
          >
            <label htmlFor="upload_file">
              <div className={styles.upload_state}>
                {file ? (
                  <div className={styles.preview_v2}>
                    <Image  
                      src = { filePreview } 
                      className={styles.video_preview}
                    />
                    <div className={styles.phone_preview}></div>
                  </div>
                ) : ( 
                  <>
                    <Image
                      // src={filePreview}  
                      src =  { initialValues.namefile } 
                      className={styles.image_preview}
                    />  
                  </>
                )}
              </div>
            </label>
            <input
              onChange={handleFile}
              name="upload_file"
              id="upload_file"
              // required
              type="file"
              accept="image/*"
              defaultValue={initialValues.namefile}
            />
          </div>
          <div className={styles.upload_content_right}>
            <div className={styles.form_item}>
                <div className={styles.form_header}>
                  <span className={styles.form_label}>Product name</span>
                </div>
                <div className={styles.form_footer}>
                  <input
                    className={styles.form_input}
                    name="productName"
                    id="productName"
                    type="text"
                    placeholder="Product name"
                    {...register("productName")}
                    // value={productName}
                    defaultValue={initialValues.productName} 
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.form_item}>
                <div className={styles.form_header}>
                  <span className={styles.form_label}>Description</span>
                  <span className={styles.form_count}>
                    {description.length} / 150
                  </span>
                </div>
                <div className={styles.form_footer}>
                  <textarea
                    maxLength={150}
                    name="description"
                    id="description"
                    {...register("description")}
                    // value={description}
                    defaultValue={initialValues.description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.form_textarea}
                  />
                </div>
              </div>
              <div className={styles.form_item}>
                <div className={styles.form_header}>
                  <span className={styles.form_label}>Price</span>
                </div>
                <div className={styles.form_footer}>
                  <input
                    className={styles.form_input}
                    name="price"
                    id="price"
                    type="text"
                    placeholder="Price"
                    {...register("price")}
                    // value={price}
                    defaultValue={initialValues.price.toString()} 
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div> 
            <div className={styles.button_container}>
              <Button text className={styles.discard}>
                Discard
              </Button>
              <Button
                primary
                // disabled={!file || isLoading}
                className={styles.post}
                type="submit"
                // leftIcon={isLoading ? <Loader /> : null}
              >
                {/* {!isLoading && "Post"} */}
                {"Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProduct;
