import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, USER_POSTS_ROUTE} from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Registr from './pages/Registr'
import UserPosts from "./pages/UserPosts";

export const authRoutes = [
/// 65653025
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: USER_POSTS_ROUTE,
        Component: UserPosts
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registr
    }
]
