import "bootstrap/dist/css/bootstrap.min.css";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import QRCode from "react-qr-code";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button, Card, Form, Image } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { uploadToImgBB } from "./utils/uploadImage";
import NewList from "./pages/newList/newList";
import List from "./pages/list/list";

function App() {
  const [qrCodeValue, setQrCodeValue] = useState<string | undefined>();
  const [formValue, setFormValue] = useState<
    | {
        id: number;
        objectName: string;
        objectType: string;
        objectCustomType: string;
        objectImage: File | null;
        objectImageUrl: string;
      }[]
    | undefined
  >();

  console.log("FORMIK FORM VALUES", formValue);

  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (qrRef.current === null) return;

    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Errore durante il download:", err);
      });
  };

  const deleteObject = (id: number) => {
    const newFormValue = formValue?.filter((i) => i.id !== id);
    if (newFormValue === undefined || newFormValue.length === 0) {
      setFormValue(undefined);
      return;
    }
    setFormValue(newFormValue);
  };

  useEffect(() => {
    if (formValue) {
      const qrCodeData = formValue.map((item) => {
        return {
          objectName: item.objectName,
          objectType: item.objectType,
          objectCustomType: item.objectCustomType,
          objectImageUrl: item.objectImageUrl,
        };
      });
      setQrCodeValue(JSON.stringify(qrCodeData));
    } else {
      setQrCodeValue(undefined);
    }
  }, [formValue]);

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
