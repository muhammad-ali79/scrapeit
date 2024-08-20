import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-1 flex-col flex-wrap items-start gap-y-4 border-t-2 border-gray-600 bg-secondary p-4 md:flex-row md:gap-x-32">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="scrapeit logo" width={80} height={100} />
      </Link>
      <div className="flex flex-col items-start gap-y-10 md:flex-row md:gap-x-16">
        <div className="flex flex-col gap-y-1">
          <p className="text-sm text-gray-300">Connect</p>
          <Link href="#">Follow us</Link>
          <Link href="#">Socail</Link>
          <Link href="#">Explore</Link>
          <Link href="#">Video</Link>
        </div>
        <div className="flex flex-col items-start gap-y-1">
          <p className="text-sm text-gray-300">Help & Support</p>
          <Link href="#">Returns</Link>
          <Link href="#">order Tracking</Link>
          <Link href="#">Help Center</Link>
          <Link href="#">Privacy</Link>
        </div>
        <div className="items-star flex flex-col gap-y-1">
          <p className="text-sm text-gray-300">Aboust us</p>
          <Link href="#">Missions</Link>
          <Link href="#">Join us</Link>
          <Link href="#">Press</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
