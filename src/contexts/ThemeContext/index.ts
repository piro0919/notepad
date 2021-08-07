import { createContext, Dispatch, SetStateAction } from "react";

export type ThemeValue = {
  setTheme: Dispatch<SetStateAction<string>>;
  theme: string;
};

const ThemeContext = createContext<ThemeValue>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
  theme: "",
});

export default ThemeContext;
