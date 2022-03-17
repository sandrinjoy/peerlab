import React from "react";
import { useRouter } from "next/router";
import Header from "../../components/ui/Header";

const Lab = () => {
  const router = useRouter();
  const { labId } = router.query;
  return (
    <>
      <Header />
      <main>
        <header>
          <h1 className="text-3xl font-semibold">{labId}</h1>
        </header>
      </main>
    </>
  );
};
export default Lab;
