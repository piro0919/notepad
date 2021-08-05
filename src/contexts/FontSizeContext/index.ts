import { createContext, Dispatch, SetStateAction } from "react";

export type FontSizeValue = {
  fontSize: string;
  setFontSize: Dispatch<SetStateAction<string>>;
};

const FontSizeContext = createContext<FontSizeValue>({
  fontSize: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFontSize: () => {},
});

export default FontSizeContext;
