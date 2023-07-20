"use client";
import { AppProps } from "next/app";
import { AuthStorage } from "@/context/Auth";

export default function App({ Component, pageProps }: AppProps) {
  console.log("APP");

  return (
    <AuthStorage>
      <Component {...pageProps} />
    </AuthStorage>
  );
}
