import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../AuthLayout/Login";
import Register from "../AuthLayout/Register";
import ResetPassword from "../AuthLayout/ResetPassword";
import PrivateRouts from "./PrivateRouts";
import MyProfile from "../pages/MyProfile/MyProfile";
import JoinAsEmployee from "../pages/Join as Employee/JoinAsEmployee";
import JoinAsHR from "../pages/Join as HR/JoinAsHR";
import AssetList from "../pages/Asset List/AssetList";
import AddAsset from "../pages/Add Asset/AddAsset";
import AllRequest from "../pages/All Request/AllRequest";
import RequestAsset from "../pages/RequestAsset";
import EmployeeList from "../pages/Employee Layout/EmployeeList";
import EditAsset from "../pages/Edit Asset/EditAsset";
import HR from "./HR";
import Employee from "./Employee";
import Forbidden from "../pages/Fobidden";
import EditEmployee from "../pages/Employee Layout/EditEmployee";
import AddEmployee from "../pages/Employee Layout/AddEmployee";
import MyAssets from "../pages/MyAssets/MyAssets";
import MyTeam from "../pages/MyTeam/MyTeam";
import PackageLayout from "../PackageLayout/PackageLayout";
import HRPackageUpgrade from "../PackageLayout/HRPackageUpgrade";
import UpgradeSuccess from "../PackageLayout/UpgradeSuccess";
import UpgradeCancel from "../PackageLayout/UpgradeCancel";
import Error from "../pages/Error404/Error";
import ChartHr from "../PackageLayout/ChartHr";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
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
        path: "/profile",
        element: (
          <PrivateRouts>
            <MyProfile />
          </PrivateRouts>
        ),
      },
      {
        path: "/assetList",
        element: (
          <PrivateRouts>
            <HR>
              <AssetList />
            </HR>
          </PrivateRouts>
        ),
      },
      {
        path: "/addAsset",
        element: (
          <PrivateRouts>
            <HR>
              <AddAsset />
            </HR>
          </PrivateRouts>
        ),
      },
      {
        path: "/editAsset/:id",
        element: (
          <PrivateRouts>
            <HR>
              <EditAsset />
            </HR>
          </PrivateRouts>
        ),
      },
      {
        path: "/requestAsset",
        element: (
          <PrivateRouts>
            <Employee>
              <RequestAsset />
            </Employee>
          </PrivateRouts>
        ),
      },
      {
        path: "/myTeam",
        element: (
          <PrivateRouts>
            <Employee>
              <MyTeam />
            </Employee>
          </PrivateRouts>
        ),
      },
      {
        path: "/myAssets",
        element: (
          <PrivateRouts>
            <Employee>
              <MyAssets />
            </Employee>
          </PrivateRouts>
        ),
      },
      {
        path: "/allRequests",
        element: (
          <PrivateRouts>
            <HR>
              <AllRequest />
            </HR>
          </PrivateRouts>
        ),
      },
      {
        path: "/employeeList",
        element: (
          <PrivateRouts>
            <HR>
              <EmployeeList />
            </HR>
          </PrivateRouts>
        ),
      },
      {
        path: "/editEmployee/:id",
        element: (
          <PrivateRouts>
            <HR>
              <EditEmployee />
            </HR>
          </PrivateRouts>
        ),
      },
      {
        path: "/addEmployee",
        element: (
          <PrivateRouts>
            <HR>
              <AddEmployee />
            </HR>
          </PrivateRouts>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "packageUpgrade",
    element: (
      <PrivateRouts>
        <HR>
          <PackageLayout />
        </HR>
      </PrivateRouts>
    ),
    children: [
      {
        path: "hrPackage",
        element: <HRPackageUpgrade />,
      },
      {
        path: "upgrade-success",
        element: <UpgradeSuccess />,
      },
      {
        path: "upgrade-cancel",
        element: <UpgradeCancel />,
      },
      {
        path: "chartHr",
        element: <ChartHr />,
      },
    ],
  },
]);
