import {
    ADMIN_SERVICE_ROUTE,
    BASKET_ROUTE, SERVICE_EDIT_ROUTE,
    SERVICE_ROUTE,
    LOGIN_ROUTE, ORDERING_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE, HOME_ROUTE, PHOTO_ROUTE, CONTACT_ROUTE,
    ADMIN_PHOTO_ROUTE, PHOTO_EDIT_ROUTE, FEEDBACK_ROUTE
} from './utils/consts';
import Home from "./pages/Home";
import PhotoPage from "./pages/PhotoPage";
import Contact from "./pages/Contact";
import AdminService from "./pages/AdminService";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ServicePage from "./pages/ServicePage";
import BasketCard from "./pages/BasketCard";
import OneOrder from "./pages/OneOrder";
import ServicePageEdit from "./pages/ServicePageEdit";
import Ordering from "./pages/Ordering";
import AdminPhoto from "./pages/AdminPhoto";
import PhotoPageEdit from "./pages/PhotoPageEdit";
import Feedback from "./pages/Feedback";

export const authRouters = [
    {
        path: ADMIN_SERVICE_ROUTE,
        Component: AdminService
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: OneOrder
    },
    {
        path: SERVICE_EDIT_ROUTE + '/:id',
        Component: ServicePageEdit
    },
    {
        path: ADMIN_PHOTO_ROUTE,
        Component: AdminPhoto
    },
    {
        path:PHOTO_EDIT_ROUTE + '/:id',
        Component: PhotoPageEdit
    }

];

export const publicRouters = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: PHOTO_ROUTE,
        Component: PhotoPage
    },
    {
        path: CONTACT_ROUTE,
        Component: Contact
    },
    {
        path: ORDERING_ROUTE,
        Component: Ordering
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SERVICE_ROUTE + '/:id',
        Component: ServicePage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketCard
    },
    {
        path: FEEDBACK_ROUTE,
        Component: Feedback
    },
];
