import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 1000) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(timer);
  }, [delay, value]);

  return debounced;
};
