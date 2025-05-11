import { useCallback, useEffect, useState } from "react";
import { getBoxes } from "../../utils/firebase/firestore";
import { getUserId } from "../../utils/user";
import styles from "./list.module.scss";
import ObjCard from "../../components/molecules/objCard/objCard";

const List = () => {
  const [list, setList] = useState<Place[] | undefined>();
  useEffect(() => {
    const userId = getUserId();
    getBoxes(userId).then((data) => {
      setList(data);
    });
  }, []);

  return (
    <div className={styles.list}>
      <h1>Lista</h1>
      <div className={styles.placeContainer}>
        {list?.map((place) => (
          <div key={place.place}>
            <h2>{place.place}</h2>
            {place.boxes.map((box) => (
              <div key={box.box_name}>
                <h3 className={styles.boxName}>{box.box_name}</h3>
                <div className={styles.boxContent}>
                  {box.box_content.map((content) => (
                    <ObjCard item={content} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
