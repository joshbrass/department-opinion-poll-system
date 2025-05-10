import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Options from "./pages/option-page/OptionsPage";
import PollsList from "./pages/poll-list/PollsList";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import { RootState } from "./store/store";
import { userActions } from "./store/slices/user-slice";

function App() {
  const dispatch = useDispatch();
  const [rehydrated, setRehydrated] = useState(false); 
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.isAdmin ?? false;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        userActions.changeCurrentUser({
          id: parsedUser._id,
          token,
          isAdmin: parsedUser.isAdmin,
        })
      );
    }

    
    setRehydrated(true);
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <RootLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <PollsList />,
        },
        {
          path: "poll-list",
          element: <PollsList />,
        },
        {
          path: "admin",
          element: (
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              requireAdmin={true}
            >
              <Polls />
            </ProtectedRoute>
          ),
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

  
  if (!rehydrated) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
