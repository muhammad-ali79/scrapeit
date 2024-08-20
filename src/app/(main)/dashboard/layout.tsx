import Footer from "@/components/footer";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <nav className="flex h-[10vh] items-center gap-x-4 bg-secondary">
        <Image
          src={"/logo.svg"}
          width={70}
          height={70}
          alt="scrapeit Logo"
          className="mx-4"
        />
        <ul className="mr-12 flex flex-1 items-center justify-end gap-x-8 md:gap-x-12">
          <li>Go Pro</li>
          <li>Notifications</li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
      {children}
      {/* <Footer /> */}
    </div>
  );
}
export default Layout;
