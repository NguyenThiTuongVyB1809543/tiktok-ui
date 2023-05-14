export const routes = {
  home: "/",
  following: "/following",

  profile: "/@:nickname",
  profileLink: (nickname) => `/@${nickname}`,
  editprofile: "/@:nickname/edit",
  editProfileLink: (nickname) => `/@${nickname}/edit`,

  booth: "/@:nickname/booth",
  boothLink: (nickname) => `/@${nickname}/booth`, 

  addProduct: "/@:nickname/add_product",
  addProductLink: (nickname) => `/@${nickname}/add_product`,
  
  editproduct: "/@:id/edit_product",
  editProductLink: (product) => `/@${product._id}/edit_product`,
  
  live: "/live",
  upload: "/upload",
  search: "/search",
  messages: "/messages",
  cart: "/cart",
  purchasehistory: "/purchasehistory",
  orders: "/orders",
  notification: "/notification",
  login: "/login",
  register: "/register",
  video: "/@:nickname/videos/:id",
  // videoLink: (content) => `/${content.file_url}`,
  videoLink: (content) => `/@${content.user.nickname}/videos/${content._id}`,
  videoLinknoti: (content) => `/videos/${content}`,
  comment: "/videos/:id/comments",
};
