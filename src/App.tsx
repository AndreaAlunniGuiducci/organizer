import "bootstrap/dist/css/bootstrap.min.css";
import {
  Outlet,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import "./App.css";
import Header from "./components/molecules/header/header";
import ProtectedRoute from "./components/molecules/protectedRoute/protectedRoute";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import List from "./pages/list/list";
import BoxName from "./pages/nameList/boxName";
import NewList from "./pages/newList/newList";
import QrList from "./pages/qrList/qrList";
import { routes } from "./utils/routes";

function App() {
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
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          ),
        },
        {
          path: routes.nameList,
          element: (
            <ProtectedRoute>
              <BoxName />
            </ProtectedRoute>
          ),
        },
        {
          path: routes.newList,
          element: (
            <ProtectedRoute>
              <NewList />
            </ProtectedRoute>
          ),
        },
        {
          path: routes.qrList,
          element: (
            // <ProtectedRoute >
            <QrList />
            // </ProtectedRoute>
          ),
        },
        {
          path: routes.list,
          element: (
            <ProtectedRoute>
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
