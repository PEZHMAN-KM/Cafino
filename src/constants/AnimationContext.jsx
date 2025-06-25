import { createContext, useContext } from "react";

export const AnimationContext = createContext(false);

export const useAnimation = () => useContext(AnimationContext);
