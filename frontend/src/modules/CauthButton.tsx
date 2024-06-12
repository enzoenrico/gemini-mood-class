import React, { useEffect, useState } from "react";
import app from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(app);

const AuthButton = () => {
  const [user, setUser] = useState<string | null>(null);

  const checkUser = (): void => {
    const sessionUser = localStorage.getItem("user-emotion-thingy");
    if (sessionUser != null && sessionUser !== "") {
      setUser(sessionUser);
      return;
    }
  };
  const createUserWithGoogleAccount = (e) => {
    if (!user) {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          setUser(result.user?.displayName);
          localStorage.setItem(
            "user-emotion-thingy",
            result.user?.displayName || ""
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:px-6 transition-all "
      onClick={createUserWithGoogleAccount}
      style={{ backgroundColor: user ? "green" : "blue" }}
    >
      {user ? `Welcome ${user}` : "Login with Google"}
    </button>
  );
};

export default AuthButton;
