import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddService from "../../Pages/Dashboard/AddService/AddService";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import AboutUs from "../../Pages/Home/AboutUs/AboutUs";
import Blog from "../../Pages/Home/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import NotFound from "../../Pages/Home/NotFound/NotFound";
import ServicesAll from "../../Pages/Home/Services/ServicesAll";
import ViewDetails from "../../Pages/Home/Services/ViewDetails";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/services",
        element: <ServicesAll></ServicesAll>,
      },
      {
        path: "/viewDetails/:id",
        element: <ViewDetails></ViewDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addService",
        element: (
          <AdminRoute>
            <AddService></AddService>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
export default router;
