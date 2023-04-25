import React, { memo, useEffect, useState } from "react";
import styles from "./ListContentVideo.module.scss";
import { videosService } from "~/features/videos/services/videosService";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Core/Loader";
import ContentVideo from "../ContentVideo";

import axios from "axios";



function ListContentVideo({ type }) {
  const { user } = useSelector((state) => state.user);
  const [listVideo, setListVideo] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  // const axiosInstance = axios.create({
  //   baseURL: import.meta.env.VITE_BASE_URL,
  // });

  // const Get = async (url, options = {}) => {
  //   try {
  //     const response = await axiosInstance.get(url, options);
  //     return response.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const GetListVideo = async (type = "for-you", page = 1) => {
  //   try {
  //     const res = await Get("videos", {
  //       params: {
  //         type,
  //         page,
  //       },
  //     });
  //     // console.log(res);
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



  // useEffect(() => {
  //   const getListVideo = async () => {
  //     const result = await GetListVideo(type);
  //     setListVideo(result);
  //   };

  //   getListVideo();
  // }, [user]);

  // const fetchListVideo = async () => {
  //   const result = await GetListVideo(type, page);
  //   return result;
  // };

  // const fetchData = async () => {
  //   const listVideoNext = await fetchListVideo();
  //   setListVideo([...listVideo, ...listVideoNext]);
  //   if (listVideoNext.length === 0) {
  //     setHasMore(false);
  //   }
  //   setPage((prev) => prev + 1);
  // };


  useEffect(() => {
    const getListVideo = async () => {
      const result = await videosService.getListVideo(type);
      setListVideo(result);
    };

    getListVideo();
  }, [user]);

  const fetchListVideo = async () => {
    const result = await videosService.getListVideo(type, page);
    return result;
  };

  const fetchData = async () => {
    const listVideoNext = await fetchListVideo();

    setListVideo([...listVideo, ...listVideoNext]);
    if (listVideoNext.length === 0) {
      setHasMore(false);
    }
    setPage((prev) => prev + 1);
  };



  // console.log('listVideo1: ' , listVideo);

  return (
    <div className={styles.main_container}>
      <InfiniteScroll
        dataLength={listVideo.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<h4>End</h4>}
        style={{ overflow: "inherit" }}
      >
        {listVideo.map((video) => (
          <div key={video._id}> 
            <ContentVideo data={video} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default memo(ListContentVideo);
