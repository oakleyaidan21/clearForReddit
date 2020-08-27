import { useRef, useEffect } from "react";

export function useDidUpdateEffect(fn: any, inputs: any) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}
