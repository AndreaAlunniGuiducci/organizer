import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import ObjCard from "../../components/molecules/objCard/objCard";
import { addplace } from "../../utils/firebase/firestore";
import { uploadToImgBB } from "../../utils/uploadImage";
import { getUserId } from "../../utils/user";
import styles from "./newList.module.scss";
import { routes } from "../../utils/routes";

const NewList = () => {
  const location = useLocation();
  const { boxName, place } = location.state as {
    boxName: string;
    place: string;
  };
  const [qrCodeValue, setQrCodeValue] = useState<string | undefined>();
  const [formValue, setFormValue] = useState<BoxContent[] | undefined>();

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

  const handleSaveData = async () => {
    if (formValue) {
      const userId = getUserId();
      await addplace(userId, {
        place,
        boxes: [
          {
            box_name: boxName,
            box_content: formValue,
          },
        ],
      });
      handleDownload();
    }
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
          boxName,
          objectName: item.objectName,
          objectType: item.objectType,
          objectCustomType: item.objectCustomType,
          objectImageUrl: item.objectImageUrl,
        };
      });
      const objectToString = JSON.stringify(qrCodeData);
      const objectToBase64 = btoa(objectToString);
      const urlList =
        import.meta.env.VITE_BASE_URL +
        "#" +
        routes.list +
        "/" +
        objectToBase64;
      console.log("urlList", urlList);
      setQrCodeValue(urlList);
    } else {
      setQrCodeValue(undefined);
    }
  }, [formValue]);

  return (
    <div className={styles.newList}>
      <h3>
        Lista per contenitore {boxName} in {place}
      </h3>
      <Formik
        initialValues={{
          objectName: "",
          objectType: "",
          objectCustomType: "",
          objectImage: null as File | null,
          objectImageUrl: "",
        }}
        onSubmit={async (values, action) => {
          const imageUrl = await uploadToImgBB(values.objectImage);

          if (formValue) {
            const newValues = formValue.map((i, index) => ({
              ...i,
              id: index + 1,
            }));
            setFormValue([
              ...newValues,
              {
                ...values,
                id: newValues.length + 1,
                objectImage: null,
                objectImageUrl: imageUrl,
              },
            ]);
          } else {
            setFormValue([
              {
                ...values,
                id: 1,
                objectImage: null,
                objectImageUrl: imageUrl,
              },
            ]);
          }
          action.resetForm();
        }}
        validationSchema={yup.object().shape({
          objectName: yup.string().required("Nome obbligatorio"),
          objectType: yup.string().required("Tipologia obbligatoria"),
          objectCustomType: yup.string().when("objectType", {
            is: "other",
            then(schema) {
              return schema.required("Tipologia obbligatoria");
            },
          }),
          objectImage: yup.mixed<File>().nullable(),
          objectImageUrl: yup.string().url("URL non valido"),
        })}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="form">
            <Form.Group controlId="objectName">
              <Form.Label>Nome oggetto*</Form.Label>
              <Form.Control
                type="text"
                name="objectName"
                value={values.objectName}
                onChange={handleChange}
                isValid={touched.objectName && !errors.objectName}
                isInvalid={touched.objectName && !!errors.objectName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.objectName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="objectType">
              <Form.Label>Tipologia oggetto*</Form.Label>
              <Form.Select
                name="objectType"
                aria-label="Default select example"
                value={values.objectType}
                onChange={handleChange}
                isInvalid={touched.objectType && !!errors.objectType}
              >
                <option value="">Seleziona una tipologia</option>
                <option value="vestiti">Vestiti</option>
                <option value="giochi">Giochi</option>
                <option value="ferramenta">Ferramenta</option>
                <option value="other">Altro...</option>
              </Form.Select>
              {values.objectType === "other" && (
                <Form.Control
                  type="text"
                  value={values.objectCustomType}
                  onChange={handleChange}
                  isInvalid={
                    touched.objectCustomType && !!errors.objectCustomType
                  }
                  name="objectCustomType"
                  placeholder="Inserisci una tipologia"
                />
              )}
              <Form.Control.Feedback type="invalid">
                {errors.objectCustomType || errors.objectType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="objectImage">
              <Form.Label>Immagine oggetto</Form.Label>
              <Form.Control
                type="file"
                name="objectImage"
                accept="image/*"
                onChange={(e) => {
                  const selected = (e.target as HTMLInputElement).files?.[0];
                  if (selected) {
                    values.objectImage = selected;
                  }
                }}
              />
            </Form.Group>
            <Button type="submit">Aggiungi oggetto</Button>
          </Form>
        )}
      </Formik>

      <div className="cardContainer">
        {formValue &&
          formValue.map((item) => (
            <ObjCard key={item.id} item={item} deleteObject={deleteObject} />
          ))}
      </div>

      {qrCodeValue && (
        <>
          <div ref={qrRef} className={styles.qrCodeContainer}>
            <QRCode value={qrCodeValue} />
            <h3 className={styles.listName}>{boxName}</h3>
          </div>
          <div className={styles.ctaContainer}>
            <Button onClick={handleDownload}>Scarica QR Code</Button>
            <Button onClick={handleSaveData}>Salva dati</Button>
          </div>
        </>
      )}
    </div>
  );
};
export default NewList;
