import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "~/components/Core/Button";
import Loader from "~/components/Core/Loader";
import { UploadIcon } from "~/components/Icons";
import { productService } from "~/features/products/services/productService";
import styles from "./Upload.module.scss";
import Image from "./../../components/Image";
import { Formik, Form, Field, ErrorMessage  } from 'formik';


function EditProduct(product) {
  const [filePreview, setFilePreview] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [namefile, setNameFile] = useState("");
  const [price, setPrice] = useState(""); 
  const [productName, setProductName] = useState(""); 
  const params = useParams();
   

  const user1 = localStorage.getItem("user"); 
  const user = JSON.parse(user1); 
 
  const navigate = useNavigate(); 

  const initialValues = {
    namefile:  params.namefile, 
    description: params.description,
    productName: params.productName, 
    price: params.price  , 
  };
  console.log( JSON.stringify(params));



  const handleFile = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    const namefile = e.target.files[0].name;
    setNameFile(namefile);
    // console.log('e.target.files[0].name:   ', e.target.files[0].name);
    setFilePreview(src);
    setFile(e.target.files[0]);
  };

  const handleAddProduct = async (data) => {
    setIsLoading(true);
    await productService.postProduct(data);
    // console.log(data);
    setIsLoading(false);
    navigate("/");
  };
 
  const submitForm = (data) => {
    const fullData = { ...data, namefile, userId: user.data._id  };   
    console.log('fullData:  ', fullData);

    handleAddProduct(fullData);
  };
  // console.log('namefile:  ', namefile);
  // console.log('description:  ', description);
  // console.log('productName:  ', productName);
  // console.log('price:  ', price);
  const srcAvatar = "src/assets/images/";

  return (
    <form initialValues={initialValues} onSubmit={handleSubmit(submitForm)} className={styles.upload_wrapper}>
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
                      src={filePreview}  
                      className={styles.video_preview}
                    />
                    <div className={styles.phone_preview}></div>
                  </div>
                ) : (
                  <>
                    <UploadIcon />
                    <span className={styles.upload_state_title}>
                      Select image product to upload
                    </span> 
                    <Button primary noAction className={styles.select_file}>
                      Select File
                    </Button>
                  </>
                )}
              </div>
            </label>
            <input
              onChange={handleFile}
              name="upload_file"
              id="upload_file"
              required
              type="file"
              accept="image/*"
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
                    value={productName}
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
                    value={description}
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
                    value={price}
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
                disabled={!file || isLoading}
                className={styles.post}
                type="submit"
                leftIcon={isLoading ? <Loader /> : null}
              >
                {!isLoading && "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProduct;
