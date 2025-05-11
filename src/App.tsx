import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/molecules/header/header";
import ProtectedRoute from "./components/molecules/protectedRoute/protectedRoute";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import BoxName from "./pages/nameList/boxName";
import NewList from "./pages/newList/newList";
import { routes } from "./utils/routes";
import QrList from "./pages/qrList/qrList";
import List from "./pages/list/list";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const router = createHashRouter([
    {
      path: "/",
      element: (
        <div>
          <Header />
          <div className="page_container">
            <Outlet />
          </div>
        </div>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: routes.dashboard,
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: routes.nameList,
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BoxName />
            </ProtectedRoute>
          ),
        },
        {
          path: routes.newList,
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <NewList />
            </ProtectedRoute>
          ),
        },
        {
          path: routes.qrList,
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <QrList />
            </ProtectedRoute>
          ),
        },
        {
          path: routes.list,
          element: (
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <List />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
