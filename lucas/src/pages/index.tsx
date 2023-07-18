import { AuthContext, AuthStorage } from "@/context/Auth";
import Link from "next/link";
import nookies from "nookies";

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  return (
    <>
      <div>Frist</div>
      <button
        onClick={() => {
          loginUser("test@testauth.com", "12341234")
            .then(async (userCredential: any) => {
              const user = userCredential.user;
              //👇🏻 logs user's details
              console.log("User >>", user);
              // alert("Authentication successful 🎉");

              const token = await user.getIdToken();
              nookies.destroy(null, "token");
              nookies.set(null, "token", token, { path: "/" });

              router.push("/dashboard");
            })
            .catch((error: any) => {
              console.error(error);
              alert("Incorrect Email/Password ❌");
            });
        }}
      >
        LOGIN
      </button>
    </>
  );
};

export default Page;
