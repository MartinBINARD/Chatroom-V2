import { useEffect, useRef } from 'react';

/*
  Objectif :

  jouer un son personnalisé à différents moments de la vie de notre application

  - un son à chaque nouveau message
  - un autre son au _toggle_ de `<Settings />`

  Besoins :

  pour jouer un son, il y a une API :
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio

  → on doit créer un élément Audio
  `const audioElement = new Audio(sound);`
*/
function useSound(soundURL: string) {
  // je veux créer un élément audio une seule fois
  // l'élément audio devra être initialisé uniquement au 1er rendu
  const audioElement = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // j'attache mon élément audio
    audioElement.current = new Audio(soundURL);
  }, [soundURL]);

  const playSound = () => {
    if (audioElement.current) {
      //   je remets le son à 0 s
      audioElement.current.currentTime = 0;
      //   je lance le son
      audioElement.current.play();
    }
  };

  return playSound;
}

export default useSound;
