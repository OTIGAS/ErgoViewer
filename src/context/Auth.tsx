"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";
import nookies from "nookies";

interface AuthContextProps {
  user: any;
  loginUser: any;
  logOut: any;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthStorage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  console.log("AuthStorage", user);

  const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  function logOut() {
    console.log("asdasd");
    signOut(auth)
      .then(() => {
        nookies.destroy(null, "token");

        console.log("Logout successful! 🎉");
      })
      .catch((error) => {
        alert("Couldn't sign out ❌");
      });
  }

  const isUserLoggedIn = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser({ email: user.email, uid: user.uid });
        //👉🏻 Perform an authenticated request
      } else {
        console.log("isUserLoggedIn, Logout");
        return router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   async function grantModeratorRole() {
  //     const user = await auth.(email); // 1
  //     if (user.customClaims && user.customClaims.moderator === true) {
  //         return;
  //     } // 2
  //     return admin.auth().setCustomUserClaims(user.uid, {
  //         moderator: true
  //     }); // 3
  // }

  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  return (
    <AuthContext.Provider value={{ user, loginUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
