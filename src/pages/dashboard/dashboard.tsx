import { useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState<string>("");
  useEffect(() => {}, []);
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {/* <div className={styles.placesContainer}>
        <h3>I tuoi luoghi</h3>
      </div> */}
      <div className={styles.ctaContainer}>
        <h3>Nuovo luogo</h3>
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

      {/* <Button
        onClick={() => {
          const userId = getUserId();
          addplace(userId, {
            place: "stanzino",
            boxes: [
              {
                box_name: "box3",
                box_content: [
                  {
                    id: 1,
                    objectName: "Nome oggetto",
                    objectType: "Tipo oggetto",
                    objectCustomType: "",
                    objectImage: null,
                    objectImageUrl: "",
                  },
                ],
              },
            ],
          });
        }}
      >
        ADD PLACES
      </Button>
      <Button
        onClick={async () => {
          const userId = getUserId();
          const boxes = await getBoxes(userId);
          console.log("boxes", boxes);
        }}
      >
        GET PLACES
      </Button>*/}
    </div>
  );
};

export default Dashboard;
