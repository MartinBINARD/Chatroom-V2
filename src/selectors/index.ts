/* eslint-disable import/prefer-default-export */
/*
  Une fonction qui prend en paramètre le state ou une portion de state
  et qui retourne une valeur (de tout type) calculée à partir de
  celui-ci est appelé un Sélecteur.
*/

function getNextId(arr: { id: number }[]) {
  if (!arr.length) {
    return 1;
  }

  // je récupère tous les IDs
  const ids = arr.map((item) => item.id);
  // je prends le plus grand
  const maxId = Math.max(...ids);

  // je retourne le plus grand + 1
  return maxId + 1;
}

export { getNextId };
