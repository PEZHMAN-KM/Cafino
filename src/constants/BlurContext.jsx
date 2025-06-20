import { createContext, useContext } from "react";

const BlurContext = createContext(false);

export const useBlur = () => useContext(BlurContext);

export const BlurProvider = ({ children, reduceBlur = false }) => {
  if (typeof document !== "undefined") {
    if (reduceBlur) {
      document.body.classList.add("reduce-blur");
    } else {
      document.body.classList.remove("reduce-blur");
    }
  }

  return (
    <BlurContext.Provider value={reduceBlur}>{children}</BlurContext.Provider>
  );
};
