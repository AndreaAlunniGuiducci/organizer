import { useEffect, useState } from "react";
import ObjCard from "../../components/molecules/objCard/objCard";
import { getBoxes } from "../../utils/firebase/firestore";
import { getUserId } from "../../utils/user";
import styles from "./list.module.scss";
import { Button, Dropdown, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const List = () => {
  const [list, setList] = useState<Place[] | undefined>();
  const [place, setPlace] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const userId = getUserId();
    getBoxes(userId).then((data) => {
      setList(data);
    });
  }, []);

  return (
    <div className={styles.list}>
      <h1>Lista</h1>
      {list && list.length > 0 ? (
        <div className={styles.placeContainer}>
          {list?.map((place) => (
            <Dropdown key={place.place} className={styles.dropPlace}>
              <Dropdown.Toggle>
                <h2>{place.place}</h2>
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropBox}>
                {place.boxes.map((box) => (
                  <Dropdown className={styles.boxContent} key={box.box_name}>
                    <Dropdown.Toggle>
                      <h3 className={styles.boxName}>{box.box_name}</h3>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      key={box.box_name}
                      className={styles.dropObj}
                    >
                      {box.box_content.map((content) => (
                        <ObjCard item={content} key={content.id} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            // <div key={place.place}>
            //   <h2>{place.place}</h2>
            //   {place.boxes.map((box) => (
            //     <div key={box.box_name}>
            //       <h3 className={styles.boxName}>{box.box_name}</h3>
            //       <div className={styles.boxContent}>
            //         {box.box_content.map((content) => (
            //           <ObjCard item={content} />
            //         ))}
            //       </div>
            //     </div>
            //   ))}
            // </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyList}>
          <h2>Non hai ancora creato nessun contenitore</h2>
          <div className={styles.sectionDescription}>
            <p>Per iniziare seleziona il luogo dove si trova il contenitore</p>
            <InputGroup className={styles.inputGroup}>
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
      )}
    </div>
  );
};
export default List;
