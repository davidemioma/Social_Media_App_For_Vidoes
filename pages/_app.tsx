import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
