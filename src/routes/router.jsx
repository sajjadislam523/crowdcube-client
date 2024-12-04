import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CampaignDetail from "../pages/CampaignDetail";
import PrivateRoute from "./PrivateRoute";
import AllCampaignsPage from "../pages/AllCampaignsPage";
import AddCampaignPage from "../pages/AddCampaignPage";
import MyCampaignsPage from "../pages/MyCampaignsPage";
import MyDonationsPage from "../pages/MyDonationsPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/campaigns",
                element: <AllCampaignsPage />,
                loader: () => fetch("http://localhost:5000/campaigns"),
            },
            {
                path: "/campaign/:id",
                element: (
                    <PrivateRoute>
                        <CampaignDetail />
                    </PrivateRoute>
                ),
            },
            {
                path: "/addCampaign",
                element: (
                    <PrivateRoute>
                        <AddCampaignPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/myCampaign",
                element: (
                    <PrivateRoute>
                        <MyCampaignsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/myDonations",
                element: (
                    <PrivateRoute>
                        <MyDonationsPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;