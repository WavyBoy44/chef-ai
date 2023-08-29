import NavBar from "./components/NavBar";
import styles from "public/css/page.module.css";
import Image from "next/image";
import Logo from "public/logo-no-background-black.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <NavBar />

      <section className="bg-white">
        <div className="py-2 px-2 mx-auto max-w-screen-xl text-center lg:py-16">
          <Image src={Logo} alt="Logo" className={styles.logo} />
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
            AI-driven recipes for delicious dining
          </h1>
          <p className="mb-8 text-lg font-normal text-black lg:text-xl sm:px-16 lg:px-48">
            Discover a world of culinary possibilities with Chef AI, your
            ultimate cooking companion.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 ">
            <Link
              href="/form"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg dark:bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
