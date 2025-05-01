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
    element: <Login />,
    errorElement: <ErrorPage />, // Optional if you want error handling for these routes
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />, // Optional if you want error handling for these routes
  },
  {
    path: "*",
    element: <ErrorPage />,
    
  },

  // Routes with RootLayout
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PollsList />, // Default page when accessing "/"
      },
      {
        path: "poll-list",
        element: <PollsList />,
      },
      
      {
        path: "polls",
        element: <Polls />,
      },
      {
        path: "polls/:id",
        element: <PollDetails />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "polls/:id/option",
        element: <Options />,
      },
      {
        path: "congrats",
        element: <Congrats />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;