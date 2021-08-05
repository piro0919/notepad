import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Loading from "components/templates/Loading";
import AuthContext from "contexts/AuthContext";
import firebaseApp from "libs/firebaseApp";
import "firebase/auth";

function Signout(): JSX.Element {
  const { uid } = useContext(AuthContext);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const callback = async () => {
      await firebaseApp.auth().signOut();

      setIsSignedOut(true);
    };

    callback();
  }, []);

  useEffect(() => {
    if (!isSignedOut || uid) {
      return;
    }

    setTimeout(async () => {
      await router.push("/");
    }, 1000);
  }, [router, isSignedOut, uid]);

  return <Loading active={true} />;
}

export default Signout;
