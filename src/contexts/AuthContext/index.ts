import { createContext } from "react";

export type AuthContextValue = {
  uid: string;
};

const AuthContext = createContext<AuthContextValue>({
  uid: "",
});

export default AuthContext;
