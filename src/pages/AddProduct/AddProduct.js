import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Core/Button";
import Loader from "~/components/Core/Loader";
import { UploadIcon } from "~/components/Icons";
import { videosService } from "~/features/videos/services/videosService";
import styles from "./Upload.module.scss";
import Image from "./../../components/Image";

function Addproduct() {
  const [filePreview, setFilePreview] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [namefile, setNameFile] = useState("");
  const [music, setMusic] = useState(""); 


  const user1 = localStorage.getItem("user"); 
  const user = JSON.parse(user1); 
 
  const navigate = useNavigate(); 
  const handleFile = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    const namefile = e.target.files[0].name;
    setNameFile(namefile);
    // console.log('e.target.files[0].name:   ', e.target.files[0].name);
    setFilePreview(src);
    setFile(e.target.files[0]);
  };

  const handleUploadVideo = async (data) => {
    setIsLoading(true);
    await videosService.postVideo(data);
    // console.log(data);
    setIsLoading(false);
    navigate("/");
  };

  // const submitForm = (data) => {
  //   const fullData = { ...data, upload_file: file }; 
  //   const formData = new FormData(); 
  //   for (const key in fullData) {
  //     if (key === "allows") {
  //       if (fullData[key])
  //         fullData.allows.forEach(function (value) {
  //           formData.append("allows[]", value);
  //         });
  //     } else {
  //       formData.append(key, fullData[key]);
  //     }
  //   } 
  //   // for (const value of formData.values()) {
  //   //   console.log('value form data: ',value);
  //   // }
  //   for(var pair of formData.entries()) {
  //     console.log(pair[0]+ ', '+ pair[1]); 
  //   }
  //   handleUploadVideo(formData);
  // };


  const submitForm = (data) => {
    const fullData = { ...data, namefile, userId: user.data._id  };   
    handleUploadVideo(fullData);
  };
  // console.log('namefile:  ', namefile);
  // console.log('description:  ', description);
  // console.log('music:  ', music);
  const srcAvatar = "src/assets/images/";

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.upload_wrapper}>
      <div className={styles.upload_container}>
        <span className={styles.upload_title}>Add product</span>
        <div className={styles.upload_sub_title}>
          <span>Post a product to your account</span>
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
                    name="product_name"
                    id="product_name"
                    type="text"
                    placeholder="Product name"
                    {...register("music")}
                    value={music}
                    onChange={(e) => setMusic(e.target.value)}
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
                    {...register("music")}
                    value={music}
                    onChange={(e) => setMusic(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.form_item}>
                <div className={styles.form_header}>
                  {/* <span className={styles.form_label}>Cover</span> */}
                </div>
                <div className={styles.form_footer}>
                  {/* <input
                    className={styles.form_input}
                    name="thumbnail_time"
                    id="thumbnail_time"
                    {...register("thumbnail_time")}
                    type="number"
                    placeholder="Thumbnail capture position, units of seconds (Ex: 2)"
                    defaultValue={1}
                  /> */}
                </div>
              </div>
            
            <div className={styles.form_item}>
              <div className={styles.form_header}>
                {/* <span className={styles.form_label}>
                  Who can watch this video
                </span> */}
              </div>
              <div className={styles.form_footer}>
                {/* <select
                  className={styles.form_select}
                  name="viewable"
                  id="viewable"
                  {...register("viewable")}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="private">Private</option>
                </select> */}
              </div>
            </div>
            <div className={styles.form_item}>
              <div className={styles.form_header}>
                {/* <span className={styles.form_label}>Allow users to:</span> */}
              </div>
              <div className={styles.form_footer}>
                <div className={styles.form_checkbox}>
                  {/* <input
                    value="comment"
                    type="checkbox"
                    name="allows"
                    id="allows"
                    defaultChecked
                    {...register("allows")}
                  />
                  <label htmlFor="">Comment</label> */}
                </div>
                <div className={styles.form_checkbox}>
                  {/* <input
                    value="duet"
                    type="checkbox"
                    name="allows"
                    id="allows"
                    defaultChecked
                    {...register("allows")}
                  />
                  <label htmlFor="">Duet</label> */}
                </div>
                <div className={styles.form_checkbox}>
                  {/* <input
                    value="stitch"
                    type="checkbox"
                    name="allows"
                    id="allows"
                    defaultChecked
                    {...register("allows")}
                  />
                  <label htmlFor="">Stitch</label> */}
                </div>
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

export default Addproduct;
