/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

/**
 * A custom useEffect hook that only triggers on updates,
 * not on initial mount
 */
export default function useUpdateEffect(effect, dependencies) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      console.log('mount');
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
}
