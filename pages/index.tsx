import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import NewLabForm from "../components/home/NewLabform";
import SocketStatus from "../components/socketStatus";
import WebSocketProvider from "../ws/WebSocketContext";

const Home: NextPage = () => {
  return (
    <>
      <WebSocketProvider>
        <Head>
          <title>PeerLab</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="mx-auto max-w-[1200px] pb-10">
          <header className="p-10">
            <h1 className="text-3xl font-medium sm:text-4xl md:text-5xl ">
              Instant Discussions, Experiements, Brainstorming Ideas and so on.
            </h1>
            <p></p>
          </header>
          <div className="flex flex-col   gap-[3rem] p-10 sm:max-w-[400px]">
            <NewLabForm />
          </div>
        </main>
        <SocketStatus />
      </WebSocketProvider>
    </>
  );
};

export default Home;
