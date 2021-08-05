import React, { useMemo, useState } from "react";
import Loading, { LoadingProps } from "components/templates/Loading";
import SignInTop, { SignInTopProps } from "components/templates/SignInTop";
import firebaseApp from "libs/firebaseApp";
import "firebase/auth";

function Signin(): JSX.Element {
  const firebaseAuth = useMemo<SignInTopProps["firebaseAuth"]>(
    () => firebaseApp.auth(),
    []
  );
  const uiConfig = useMemo<SignInTopProps["uiConfig"]>(
    () => ({
      signInFlow: "redirect",
      signInOptions: [
        firebaseApp.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID,
        firebaseApp.auth.TwitterAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "/",
      siteName: "おんめも",
    }),
    []
  );
  const [active, setActive] = useState<LoadingProps["active"]>(false);

  return (
    <>
      <SignInTop
        firebaseAuth={firebaseAuth}
        setActive={setActive}
        uiConfig={uiConfig}
      />
      {active ? <Loading active={active} /> : null}
    </>
  );
}

export default Signin;
