/*
  Composant dédié au contrôle des champs de formulaire

  Mes besoins :

    - gérer ce champ → useState
      - `value` pour refléter le state actuel
      - `onChange` pour modifier ce state

    - identifier ce champ et récupérer sa valeur lors de la soumission
      → `name`

    - toutes les autres props pour les passer en JSX
    (et qui vont devenir des attributs HTML) [OPTIONNEL]
*/

import React, { useState } from 'react';

interface InputProps {
  // je dois avoir une _prop_ `name` : une chaîne de caractères
  name: string;
  // je peux avoir plein d'autres _props_ à condition
  // que le nom de la _prop_ soit un `string` ;
  // je connais pas d'avance le type de la valeur
  // (style={{ color: red }}, checked={true}, className="my-class"…)
  [prop: string]: unknown;
}

/*
  dans l'objet props :
  - on oblige `name` en décomposant et affectant
  - le reste est optionnel et on ne sait pas à quoi ça ressemble
    → Rest operator `...others`

  > https://javascript.info/rest-parameters-spread
  > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
*/
function Input({ name, ...props }: InputProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      name={name}
      value={value}
      onChange={handleChange}
      {...props} // je transforme chaque propriété de `props` en _prop_
    />
  );
}

export default Input;
