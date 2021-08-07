import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import Loading from "components/templates/Loading";
import Seo from "components/templates/Seo";
import AuthContext from "contexts/AuthContext";
import firebaseApp from "libs/firebaseApp";

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
    }, 2000);
  }, [router, isSignedOut, uid]);

  return (
    <>
      <Seo title="サインアウト" />
      <Loading active={true} />
    </>
  );
}

export default Signout;
