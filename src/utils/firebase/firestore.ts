import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addplace = async (place: Place) => {
  try {
    await setDoc(doc(db, "places"), {
      place: "garage",
      boxes: [
        {
          box_name: "box1",
          box_content: [
            {
              id: 1,
              objectName: "",
              objectType: "",
              objectCustomType: "",
              objectImage: "",
              objectImageUrl: "",
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
// export const addGames = (games: Game[]) => async () => {
//   try {
//     games.map(async (game) => {
//       await setDoc(doc(db, `/games/${game.id}`), { ...game });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
