import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import SocketStatus from "../../components/socketStatus";
import { userInfo } from "os";
import { useAppSelector } from "../../app/hooks";
import { wsSendMessage } from "../../components/socketStatus/StatusCard";

export async function getServerSideProps(context) {
  const id = context.query.labId;

  const res = await fetch(`${process.env.NEXT_PUBLIC_HTTPS}/findlab?id=${id}`);
  const data = await res.json();
  console.log(data);
  return {
    props: { valid: data.valid, labId: id },
  };
}

const Lab = ({ valid, labId }) => {
  const user = useAppSelector((state) => state.user);
  const ws = useAppSelector((state) => state.ws);

  if (!valid)
    return (
      <>
        <Header />
        <main className="mx-auto max-w-[1200px] pb-10">
          <header className="p-10">
            <h1 className="text-2xl font-medium sm:text-3xl md:text-4xl ">
              Sorry, This lab not exists on our server currently.
            </h1>
            <p></p>
          </header>
          <div className="flex flex-col   gap-[3rem] p-10 sm:max-w-[400px]"></div>
        </main>
        <SocketStatus />
      </>
    );
  else
    return (
      <>
        <Header />
        <main>
          <header>
            <h1 className="text-3xl font-semibold">{labId}</h1>
            <h2 className="text-xl font-semibold"> user: {user.name}</h2>
          </header>
        </main>
        <SocketStatus />
      </>
    );
};
export default Lab;
