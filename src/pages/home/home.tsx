import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth } from "../../utils/firebase/firebase";
import { routes } from "../../utils/routes";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          user_email: "",
          user_password: "",
        }}
        onSubmit={async (_, action) => {
          action.resetForm();
        }}
        validationSchema={yup.object().shape({
          user_email: yup.string().email("Email non valida"),
          user_password: yup
            .string()
            .min(6, "La password deve avere minimo 6 caratteri")
            .required("Password obbligatoria"),
        })}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="form">
            <Form.Group controlId="user_email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                name="user_email"
                value={values.user_email}
                onChange={handleChange}
                isValid={touched.user_email && !errors.user_email}
                isInvalid={touched.user_email && !!errors.user_email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.user_email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="user_password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="user_password"
                value={values.user_password}
                onChange={handleChange}
                isValid={touched.user_password && !errors.user_password}
                isInvalid={touched.user_password && !!errors.user_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.user_password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              onClick={() => {
                if (
                  !values ||
                  values.user_email.trim() === "" ||
                  values.user_password.trim() === ""
                )
                  return;
                signInWithEmailAndPassword(
                  auth,
                  values.user_email,
                  values.user_password
                )
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    window.localStorage.setItem("user", JSON.stringify(user));
                    navigate(routes.dashboard);
                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes("auth/invalid-credential")) {
                      window.alert("Email o password non validi");
                    }
                    console.error("Errore login", errorCode);
                  });
              }}
            >
              Accedi
            </Button>
            <Button
              type="submit"
              onClick={() => {
                if (
                  !values ||
                  values.user_email.trim() === "" ||
                  values.user_password.trim() === ""
                )
                  return;
                createUserWithEmailAndPassword(
                  auth,
                  values.user_email,
                  values.user_password
                )
                  .then(async (userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    const currentUser = auth.currentUser;
                    const displayName = values.user_email.split("@")[0];
                    if (currentUser) {
                      await updateProfile(auth.currentUser!, {
                        displayName,
                      }).then(() => {});
                    }
                    window.localStorage.setItem("user", JSON.stringify(user));
                    navigate(routes.dashboard);
                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.includes("auth/email-already-in-use")) {
                      window.alert("Email già in uso");
                    }
                    console.error("Error creating user", errorCode);
                    // ..
                  });
              }}
            >
              Registrati
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Home;
