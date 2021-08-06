import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import firebaseApp from "libs/firebaseApp";
import "firebase/auth";

export type Auth = Pick<firebaseApp.User, "uid">;

function useAuth(): Auth {
  const [auth, setAuth] = useState({ uid: "" });

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const { refreshToken, uid } = user;

        setCookie(null, "id_token", idToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "refresh_token", refreshToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        setAuth({ uid });

        return;
      }

      destroyCookie(null, "id_token");
      destroyCookie(null, "refresh_token");

      setAuth({ uid: "" });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return auth;
}

export default useAuth;
