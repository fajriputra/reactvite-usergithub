import { useCallback, useEffect } from "react";

export const useEscapePress = (handler) => {
  const escapePress = useCallback(
    (e) => {
      if (e.key === "Escape") handler(e);
    },
    [handler]
  );

  useEffect(() => {
    document.addEventListener("keydown", escapePress);

    return () => document.removeEventListener("keydown", escapePress);
  }, [escapePress]);
};
