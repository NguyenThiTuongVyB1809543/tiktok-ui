import { request } from "~/utils/axiosInstance";

export const getListVideo = async (type = "for-you", page = 1) => {
  try {
       
    if (localStorage.getItem("user") !== null) {
        var accessTokenObj = JSON.parse(localStorage.getItem("user"));
        // console.log('accessTokenObj: ', accessTokenObj.meta.token);
        
          const res = await request.get("videos", {
            params: {
              type,
              page,
            },
          });
          return res; 
    }
    else {
      console.log('token is null ');
      const res = await request.get("videos/show", {
            params: {
              type,
              page,
            },
          });
      return res;
    }
    // const res = await request.get("videos/show", {
    //       params: {
    //         type,
    //         page,
    //       },
    //     });
    // return res;
    

    // return res.data;
    
  } catch (err) {
    console.log(err);
  }
};
 

export const getVideo = async (id) => {
  try {
    const res = await request.get(`videos/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const postVideo = async (formData) => {
  try {
    console.log('formData2: ',formData);
    await request.post("videos", formData ,
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
    {
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
    }
    );
    
  } catch (err) {
    console.log(err);
  }
};

export const deleteVideo = async (id) => {
  try {
    await request.remove(`videos/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export * as videosService from "~/features/videos/services/videosService";
