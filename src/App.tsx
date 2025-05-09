import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import List from "./pages/list/list";
import NewList from "./pages/newList/newList";
import { routes } from "./utils/routes";
import Header from "./components/molecules/header/header";
import BoxName from "./pages/nameList/boxName";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedRoute from "./components/molecules/protectedRoute/protectedRoute";

function App() {
  const isLoggedIn = window.localStorage.getItem("user") !== null;

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
