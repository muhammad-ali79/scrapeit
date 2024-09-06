import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

function Nav() {
  let isLogin;
  return (
    <nav className="flex items-center justify-between border-b border-gray-500 bg-secondary px-4 py-2 text-white">
      <div>
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
        </Link>
      </div>
      <ul className="flex h-full justify-between space-x-8 text-lg">
        <li className="hidden md:block">
          <Link href={"#feature-section"}>Features</Link>
        </li>
        <li className="hidden md:block">
          <Link href={`${(isLogin && "/dashboard") || "/sign-up"}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href={"sign-up"}
            className="self-end rounded-lg bg-accent px-6 py-2 text-lg font-semibold"
          >
            Sign up
          </Link>
        </li>
        <UserButton />
      </ul>
    </nav>
  );
}

export default Nav;
