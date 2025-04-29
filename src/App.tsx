import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button, InputGroup } from "react-bootstrap";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import List from "./pages/list/list";
import NewList from "./pages/newList/newList";
import { auth } from "./utils/firebase/firebase";
import Home from "./pages/home/home";
import { routes } from "./utils/routes";

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
