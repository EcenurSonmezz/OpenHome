
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { House} from "../pages/House"
import {Profile} from "../pages/Profile"
import {MyHouse} from "../pages/House/MyHouse"
import {Offer} from "../pages/Offer"
import Notifications from "../pages/Notifications";



export default createBrowserRouter([

    {
        path:"/",
        Component: App,
        children:[
        {
            path:"/",
            index:true,
            Component:Home,
        },

        {
            path:"/signup",
            Component:SignUp
        },
        {
            path:"/login",
            Component:Login
        },
        {
            path:"/house",
            Component:House
        },
        {
            path: "/profile/:id",
            Component: Profile
        },
        {
            path: "/properties",
            Component: MyHouse
        },
        {
            path: "/offer/:id",
            Component: Offer
        },
        {
            path:"/notific",
            Component:Notifications
        }

        

    ]
    }
  ]);