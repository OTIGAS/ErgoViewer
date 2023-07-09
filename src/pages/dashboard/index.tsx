"use client";
import { AuthContext } from "@/context/Auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db, storage } from "../../services/firebase";
import nookies from "nookies";

import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { firebaseAdmin } from "@/services/firebaseAdmin";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import file from "./dasdadefeffawds.jpg";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    console.log("cookieeeeasedsasd", JSON.stringify(cookies, null, 2));

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const resultToken = token;

    // firebaseAdmin.auth().setCustomUserClaims(resultToken.uid, {
    //   role: "admin",
    // });

    console.log({ resultToken });
    return {
      props: {
        message: `Your email is ${resultToken.email} and your UID is ${resultToken.uid}.`,
        role: resultToken.role,
      },
    };
  } catch (err) {
    console.log({ err });
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      // redirect: {
      //   permanent: false,
      //   destination: "/",
      // },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log({ props });

  const { user, logOut } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  const addProject = async (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;

    try {
      if (!user?.uid) {
        throw new Error("uid not defined");
      }
      let imageUrl = null;

      const storageRef = ref(storage, `files/${file.name}`);
      imageUrl = await uploadBytesResumable(storageRef, file).then((snapshot) =>
        getDownloadURL(snapshot.ref)
      );

      if (!imageUrl) {
        throw new Error("imageUrl not defined");
      }

      await addDoc(collection(db, "projects"), {
        name: "abc",
        user: user.uid,
        imageUrl,
      });

      console.log(`project added! 🎉`);
    } catch (err) {
      console.log("Error! ❌");
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    console.log(`deleteProduct`, id);
    try {
      await deleteDoc(doc(db, "projects", id));
      console.log(`Project deleted 🎉`);
    } catch (err) {
      console.log("Encountered an error ❌");
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (doc) => {
      const docs: any = [];
      doc.forEach((d: any) => {
        docs.unshift({ ...d.data(), id: d.id });
      });
      setProjects(docs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div>Dashboard</div>
      <div>
        ROLE: {props.role} {JSON.stringify(user?.uid)}
      </div>

      <form onSubmit={addProject} className="form">
        <input type="file" />
        <button type="submit">ADD</button>
      </form>

      <div>
        {projects.map((i: any) => {
          return (
            <div key={i.id}>
              {i.id} <button onClick={() => deleteProduct(i.id)}>DELETE</button>
            </div>
          );
        })}
      </div>
      <button onClick={() => logOut()}>LOGOUT</button>
    </>
  );
}
