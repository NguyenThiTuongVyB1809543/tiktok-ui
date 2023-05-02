import { likeService } from "~/features/videos/services/postLikeVideoService";

const handleLikeFunc = async (video) => {
  let newVideo;
  if (video && video.is_liked) {
    newVideo = await likeService.unlike(video._id);
  } else {
    newVideo = await likeService.like(video._id);
  }
  console.log('newVideo: ', newVideo);
  return newVideo;
};

export default handleLikeFunc;
