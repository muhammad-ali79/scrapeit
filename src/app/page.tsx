import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import FeaturesSection from "@/components/features-section";
import PopularProducts from "@/components/popularProducts";
import Footer from "@/components/footer";
import { ClientButton } from "@/components/search";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="flex h-full flex-col items-center bg-secondary">
        <Image src={"/main.png"} alt="mainImage" width={400} height={400} />
        <h1 className="m-8 text-4xl">Welcome to Scrapeit!</h1>
        <h3 className="mb-8 text-center">
          Discover, track, and purchase products seamlessly with Scrapeit.
          Explore price trends, compare data easily.
        </h3>
        <button className="mb-8 rounded-full bg-accent px-12 py-2 text-center text-lg">
          <Link href={"#feature-section"}>Explore</Link>
        </button>
      </div>
      <div className="h-full bg-primary pb-8 pt-40" id="feature-section">
        <FeaturesSection />
      </div>
      {/* Fetched popular product */}
      <PopularProducts />
      <Footer />
      <ClientButton />
    </main>
  );
}
