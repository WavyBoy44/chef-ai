import Logo from "public/logo-no-background.svg";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import styles from "public/css/navbar.module.css";
import Link from "next/link";

export default function NavBar() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  //const user = getUser();

  console.log(isAuthenticated.call);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="Chef AI Logo"
            className={styles.logo}
            priority={true}
          />
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        </div>
      </div>
    </nav>
  );
}
