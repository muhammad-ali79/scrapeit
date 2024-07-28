import Link from "next/link";
import React from "react";
import Image from "next/image";

function Nav() {
  let isLogin;
  return (
    <nav className="flex items-center justify-between border-b border-gray-500 bg-secondary px-4 py-2">
      <div>
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
        </Link>
      </div>
      <ul className="mr-16 flex justify-between space-x-8 text-lg">
        <li>
          <Link href={"#feature-section"}>Features</Link>
        </li>
        <li>
          <Link href={`${(isLogin && "//dashboard") || "/login"}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href={"/login"}>Signup</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
