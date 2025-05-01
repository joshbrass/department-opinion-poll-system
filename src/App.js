import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/root-layout/RootLayout";
import ErrorPage from "./pages/error-page/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Polls from "./pages/polls/Polls";
import PollDetails from "./pages/poll-details/PollDetails";
import Results from "./pages/results/Results";
import LogOut from "./pages/log-out/LogOut";
import Congrats from "./pages/congrats/Congrats";
import './App.css';
import Options from "./pages/option-page/OptionsPage";
import PollsList from "./pages/poll-vote/PollsList";
const router = createBrowserRouter([
    // Routes without RootLayout (Login and Register)
    {
        path: "/login",
        element: _jsx(Login, {}),
        errorElement: _jsx(ErrorPage, {}), // Optional if you want error handling for these routes
    },
    {
        path: "/register",
        element: _jsx(Register, {}),
        errorElement: _jsx(ErrorPage, {}), // Optional if you want error handling for these routes
    },
    {
        path: "*",
        element: _jsx(ErrorPage, {}),
    },
    // Routes with RootLayout
    {
        path: "/",
        element: _jsx(RootLayout, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            {
                index: true,
                element: _jsx(PollsList, {}), // Default page when accessing "/"
            },
            {
                path: "poll-list",
                element: _jsx(PollsList, {}),
            },
            {
                path: "polls",
                element: _jsx(Polls, {}),
            },
            {
                path: "polls/:id",
                element: _jsx(PollDetails, {}),
            },
            {
                path: "results",
                element: _jsx(Results, {}),
            },
            {
                path: "polls/:id/option",
                element: _jsx(Options, {}),
            },
            {
                path: "congrats",
                element: _jsx(Congrats, {}),
            },
            {
                path: "logout",
                element: _jsx(LogOut, {}),
            },
        ],
    },
]);
function App() {
    return _jsx(RouterProvider, { router: router });
}
export default App;
