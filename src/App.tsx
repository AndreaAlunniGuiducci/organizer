import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import List from "./pages/list/list";
import NewList from "./pages/newList/newList";

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
          {/* <Header /> */}
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "/",
          element: (
            <div>
              <Link to="/nuova_lista">
                <Button variant="primary">Crea una nuova lista</Button>
              </Link>
            </div>
          ),
        },
        {
          path: "/nuova_lista",
          element: <NewList />,
        },
        {
          path: "/list/:qrCode",
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
