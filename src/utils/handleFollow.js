import { followService } from "~/features/accounts/services/postFollowService";

const handleFollowFunc = async (user) => {
  let newUser;
  if (user && user.is_followed) { 
    newUser = await followService.unfollow(user._id);
  } else {
    newUser = await followService.follow(user._id);
  }
  // console.log('newUser.is_followed: ', newUser.is_followed);
  return newUser && newUser.is_followed;
   
};

export default handleFollowFunc;
