import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../AuthLayout/Login"
import Register from "../AuthLayout/Register";
import ResetPassword from "../AuthLayout/ResetPassword";
import PrivateRouts from "./PrivateRouts";
import MyProfile from "../pages/MyProfile/MyProfile";
import JoinAsEmployee from "../pages/Join as Employee/JoinAsEmployee";
import JoinAsHR from "../pages/Join as HR/JoinAsHR";
import AssetList from "../pages/Asset List/AssetList";
import AddAsset from "../pages/Add Asset/AddAsset";
import AllRequest from "../pages/All Request/AllRequest";
import Dashboard from "../pages/Employee List/Dashboard";
import RequestAsset from "../pages/RequestAsset";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/joinEmployee",
        element: <JoinAsEmployee />,
      },
      {
        path: "/joinHr",
        element: <JoinAsHR />,
      },
      {
        path: '/profile',
        element: <PrivateRouts>
          <MyProfile />
        </PrivateRouts>
      },
      {
        path: '/assetList',
        element: <PrivateRouts>
          <AssetList />
        </PrivateRouts>
      },
      {
        path: '/addAsset',
        element: <PrivateRouts>
          <AddAsset />
        </PrivateRouts>
      },
      {
        path: '/requestAsset',
        element: <RequestAsset />
      },
      {
        path: '/allRequests',
        element: <PrivateRouts>
          <AllRequest />
        </PrivateRouts>
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/resetPassword",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      
    ]
  }
]);
