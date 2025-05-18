import { useEffect, useState } from "react";
import ObjCard from "../../components/molecules/objCard/objCard";
import { getBoxes } from "../../utils/firebase/firestore";
import { getUserId } from "../../utils/user";
import styles from "./list.module.scss";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { Search } from "react-bootstrap-icons";

const List = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<Place[] | undefined>();
  const [place, setPlace] = useState<string>("");
  const [searchValues, setSearchValues] = useState<{
    name: string;
    type: string;
    customType: string;
  }>({
    name: "",
    type: "",
    customType: "",
  });
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  const submitSearch = () => {
    
  };

  useEffect(() => {
    const userId = getUserId();
    getBoxes(userId).then((data) => {
      setList(data);
    });
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.titleContainer}>
        <h1>Lista</h1>
        <Search
          className={styles.icon}
          onClick={() => setSearchIsOpen(!searchIsOpen)}
        />
      </div>
      <div
        className={`${styles.searchContainer} ${
          searchIsOpen ? "" : styles.searchClosed
        }`}
      >
        <Form onSubmit={submitSearch}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={searchValues.name}
              onChange={(e) =>
                setSearchValues({ ...searchValues, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipologia</Form.Label>
            <Form.Select
              value={searchValues.type}
              onChange={(e) =>
                setSearchValues({ ...searchValues, type: e.target.value })
              }
            >
              <option value="">Seleziona una tipologia</option>
              <option value="vestiti">Vestiti</option>
              <option value="giochi">Giochi</option>
              <option value="ferramenta">Ferramenta</option>
              <option value="other">Altro...</option>
            </Form.Select>
            {searchValues.type === "other" && (
              <Form.Control
                type="text"
                value={searchValues.customType}
                onChange={(e) =>
                  setSearchValues({
                    ...searchValues,
                    customType: e.target.value,
                  })
                }
              />
            )}
          </Form.Group>
          <Button type="submit">Cerca</Button>
        </Form>
      </div>
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
