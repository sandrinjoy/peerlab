import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";

function Header() {
  const router = useRouter();
  const [showBorder, setShowBorder] = useState(false);

  function handleScroll() {
    const position = window.scrollY;
    setShowBorder(position > 40);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header className="z-[1000] bg-neutral-50  sticky top-0  w-full px-5    flex  flex-col md:flex-row justify-center items-center md:justify-between      transition duration-300 ease-in-out    ">
      <nav
        className={
          showBorder
            ? `w-full  flex  flex-col md:flex-row justify-center items-center md:justify-between max-w-[1200px] mx-auto border-b transition-all`
            : `w-full  flex  flex-col md:flex-row justify-center items-center md:justify-between max-w-[1200px] mx-auto transition-all border-b border-neutral-50 `
        }
      >
        <div className="flex items-center justify-center py-2 md:py-4">
          <Link href="/" passHref>
            <a
              aria-label="homepage"
              className="flex items-center gap-2 px-2 font-semibold transition group text-lg text-neutral-900 hover:text-indigo-500 "
            >
              PeerLab
            </a>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-around py-3 gap-5 md:py-4">
          {" "}
          <Link href="/about">
            <a
              aria-label="about"
              className={
                router.pathname.split("?")[0] == "/about"
                  ? "  font-medium text-sm     text-indigo-600   transition hover:text-indigo-500 "
                  : "  font-medium text-sm   text-neutral-900   transition    hover:text-indigo-500 "
              }
            >
              About
            </a>
          </Link>
          <Link href="/github">
            <a
              aria-label="github"
              className={
                router.pathname.split("?")[0] == "/contact"
                  ? "  font-medium text-sm     text-indigo-600  transition hover:text-indigo-500 "
                  : "  font-medium text-sm   text-neutral-900   transition   hover:text-indigo-500 "
              }
            >
              Github
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
