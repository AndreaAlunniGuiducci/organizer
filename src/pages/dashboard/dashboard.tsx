import { useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import styles from "./dashboard.module.scss";
import Divider from "../../components/atoms/divider/divider";

const Dashboard = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState<string>("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user || "[]");
    const userId = parsedUser?.uid;
    if (!userId) {
      console.log("User not logged in");
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.section}>
        <h3>Nuovo luogo</h3>
        <div className={styles.sectionDescription}>
          <p>Per iniziare seleziona il luogo dove si trova il contenitore</p>
          <InputGroup>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (place) {
                    navigate(routes.nameList, { state: { place } });
                  }
                }
              }}
            />
            <Button
              onClick={() => {
                if (!place) return;
                navigate(routes.nameList, { state: { place } });
              }}
            >
              Avanti
            </Button>
          </InputGroup>
        </div>
      </div>
      <Divider />
      <div className={styles.section}>
        <h3>I miei contenitori</h3>
        <div className={styles.sectionDescription}>
          <p>Guarda la lista dei tuoi contenitori</p>
          <Link to={routes.list}>
            <Button>I miei luoghi</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
