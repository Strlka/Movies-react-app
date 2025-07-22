import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import ErrorPage from "./pages/ErrorPage";
import UserLists from "./components/UserLists";
import AccountPage from "./pages/AccountPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <HomePage />},
            {path: 'movies/:slug', element: <MoviePage />},
            {path: 'account', element: <AccountPage />},
            {path: 'movieslists', element: <UserLists />}
        ]

    }
])

export default router
