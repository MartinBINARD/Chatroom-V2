/* eslint-disable import/prefer-default-export */
// /*
//   Une fonction qui prend en paramètre le state ou une portion de state
//   et qui retourne une valeur (de tout type) calculée à partir de
//   celui-ci est appelé un Sélecteur.
// */

import { RootState } from '..';

// function getNextId(arr: { id: number }[]) {
//   if (!arr.length) {
//     return 1;
//   }

//   // je récupère tous les IDs
//   const ids = arr.map((item) => item.id);
//   // je prends le plus grand
//   const maxId = Math.max(...ids);

//   // je retourne le plus grand + 1
//   return maxId + 1;
// }

// export { getNextId };

/*
  version curryfiée

  je veux avoir une fonction qui sera appelée comme ça :
  `getIsMine(author)(state)`

  getIsMine doit être un fonction qui :
  - prend `author` comme paramètre
  - retourne une fonction
      → qui prendra `state` en paramètre

  function getIsMine(author) {
    return function (state) {
      return state.settings.pseudo === author;
    }
  }

  En fléchée :
*/
export const getIsMine = (author: string) => (state: RootState) =>
  state.settings.pseudo === author;
