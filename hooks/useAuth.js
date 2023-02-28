import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  getAuth,
} from "@firebase/auth";
import { makeRedirectUri } from "expo-auth-session";
const AuthContex = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState();
  const [idToken, setIdToken] = useState();
  const [loadingInitial, setLoadingInital] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      expoClientId:
        "1029514800205-08i8lqn3akq70031dsjvsjs8qfuh8bjd.apps.googleusercontent.com",
      iosClientId:
        "1029514800205-ho7e63t2s0821bnecopctm8r0r9m9hjr.apps.googleusercontent.com",
      androidClientId:
        "1029514800205-vnkl7resdg825hm18uldtkfv7rfps8go.apps.googleusercontent.com",
      webClientId:
        "1029514800205-vnkl7resdg825hm18uldtkfv7rfps8go.apps.googleusercontent.com",
      redirectUri: makeRedirectUri({ useProxy: true }),
    },
    {
      useProxy: true,
    }
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      //Get tokens
      setAccessToken(response.authentication.accessToken);
      setIdToken(response.authentication.idToken);
    }
  }, [response]);

  async function firebaseLogin() {
    setLoading(true);
    const credentials = GoogleAuthProvider.credential(idToken, accessToken);
    await signInWithCredential(auth, credentials);
    setLoading(false);
  }
  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  //Firebase to check if the user exists
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUser(uid);
        } else {
          setUser(null);
        }
        setLoadingInital(false);
      }),
    []
  );

  const memoedValue = useMemo(
    () => ({
      user,
      promptAsync,
      request,
      firebaseLogin,
      accessToken,
      loading,
      error,
      logOut,
    }),
    [user, loading, error]
  );

  return (
    <AuthContex.Provider
      value={{
        user,
        promptAsync,
        request,
        firebaseLogin,
        accessToken,
        loading,
        error,
        logOut,
      }}
    >
      {!loadingInitial && children}
    </AuthContex.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContex);
}
