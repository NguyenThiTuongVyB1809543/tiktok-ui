import { lazy } from "react";
import { config } from "~/config";

// Layouts
const ModalVideo = lazy(() => import("~/pages/ModalVideo"));
import { HeaderOnly } from "~/layouts";

// Pages
const Following = lazy(() => import("~/pages/Following"));
const Home = lazy(() => import("~/pages/Home"));
const Live = lazy(() => import("~/pages/Live"));
const NotFound = lazy(() => import("~/pages/NotFound"));
const Profile = lazy(() => import("~/pages/Profile"));
const Notification = lazy(() => import("~/pages/Notification"));
const Message = lazy(() => import("~/pages/Message"));
const Cart = lazy(() => import("~/pages/Cart"));
const PurchaseHistory = lazy(() => import("~/pages/PurchaseHistory"));
const Orders = lazy(() => import("~/pages/Orders"));
const Booth = lazy(() => import("~/pages/Booth"));
const EditProfile = lazy(() => import("~/pages/EditProfile"));
const EditProduct = lazy(() => import("~/pages/EditProduct"));
const AddProduct = lazy(() => import("~/pages/AddProduct"));
const Upload = lazy(() => import("~/pages/Upload"));
const Login = lazy(() => import("~/pages/Login"));
const Register = lazy(() => import("~/pages/Register"));

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.live, component: Live },
  { path: config.routes.login, component: Login, layout: HeaderOnly },
  { path: config.routes.register, component: Register, layout: HeaderOnly },
  {
    path: config.routes.video,
    component: ModalVideo,
    layout: HeaderOnly,
  },
  
  { path: "*", component: NotFound, layout: null }, 
];

const privateRoutes = [
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.notification, component: Notification },
  { path: config.routes.messages, component: Message },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.purchasehistory, component: PurchaseHistory },
  { path: config.routes.orders, component: Orders },
  { path: config.routes.booth, component: Booth },
  { path: config.routes.editprofile, component: EditProfile },
  { path: config.routes.editproduct, component: EditProduct },
  { path: config.routes.addProduct, component: AddProduct },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
