import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import List from "./pages/list/list";
import NewList from "./pages/newList/newList";
import { routes } from "./utils/routes";
import Header from "./components/molecules/header/header";

function App() {
  // da usare se non si utilizza formik
  // const [validated, setValidated] = useState(false);
  // const handleSubmit = (event: any) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   event.preventDefault();

  //   setValidated(true);
  // };

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
          path: routes.newList,
          element: <NewList />,
        },
        {
          path: routes.list,
          element: <List />,
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
