import axios from "axios";
import nookies from "nookies";
import firebaseAdmin from "libs/firebaseAdmin";

export type VerifyIdTokenParams = Parameters<typeof nookies.get>[0] &
  Parameters<typeof nookies.set>[0];

export type VerifyIdTokenData = {
  email?: string;
  uid: string;
};

async function verifyIdToken(
  ctx: VerifyIdTokenParams
): Promise<{ data: VerifyIdTokenData } | { error: Error }> {
  const { id_token: idToken, refresh_token: refreshToken } = nookies.get(ctx);

  try {
    const { email, uid } = await firebaseAdmin.auth().verifyIdToken(idToken);

    return {
      data: { email, uid },
    };
  } catch (error) {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !refreshToken) {
      return { error };
    }

    try {
      const {
        data: { id_token: newIdToken, user_id: uid },
      } = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }
      );

      const { email } = await firebaseAdmin.auth().verifyIdToken(newIdToken);

      nookies.set(ctx, "id_token", newIdToken, {
        path: "/",
      });

      return {
        data: {
          email,
          uid,
        },
      };
    } catch (error) {
      return { error };
    }
  }
}

export default verifyIdToken;
