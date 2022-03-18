import React from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import SocketStatus from "../../components/socketStatus";
import { userInfo } from "os";
import { useAppSelector } from "../../app/hooks";

const Lab = () => {
  const router = useRouter();
  const { labId } = router.query;
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <Header />
      <main>
        <header>
          <h1 className="text-3xl font-semibold">{labId}</h1>
          <h2 className="text-xl font-semibold"> user: {user.id}</h2>
        </header>
      </main>
      <SocketStatus />
    </>
  );
};
export default Lab;
