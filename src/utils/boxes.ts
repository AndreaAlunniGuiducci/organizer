export const mergeBoxesByPlace = (data: Place[]): Place[] => {
  const mergedByPlace: Place[] = [];

  data.forEach((item) => {
    const existing = mergedByPlace.find((p) => p.place === item.place);

    if (existing) {
      // Se il place esiste già, unisci le boxes
      existing.boxes = [...existing.boxes, ...item.boxes];
    } else {
      // Altrimenti, aggiungi direttamente
      mergedByPlace.push({ ...item });
    }
  });
  return mergedByPlace;
};
