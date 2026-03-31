import {useEffect, useState} from "react"

export const useDebounced = <T>(value: T, delaysMs: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebounced(value), delaysMs);
    return () => window.clearTimeout(handle);
  }, [value, delaysMs]);

  return debounced;
}