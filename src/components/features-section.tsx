import Image from "next/image";
import Card from "./card";
import Link from "next/link";

function FeaturesSection() {
  return (
    <div className="relative h-full text-white">
      <h2 className="mb-12 text-center text-7xl">Features</h2>
      <div className="h-full">
        <Image
          src={"/girl2.png"}
          alt="streetGirl"
          width={1000}
          height={1000}
          priority
          className="w-screen"
        />
      </div>
      <div className="absolute top-[12rem] flex w-full flex-col space-y-2 px-4 lg:top-[18rem] lg:space-y-16">
        <h3 className="text-center text-2xl">Discover our Latest Tools</h3>
        <div className="flex w-full items-center justify-center gap-x-2 lg:gap-x-8">
          <Card
            cardImg="/product1.png"
            cardHeading="Price Tracker"
            cardDesc="Track price changes effortlessly and make informed purchase decisions. Stay ahead of the game with Scrapeit."
            buttonText="Track Now"
            isNewFeature={true}
            cardWidth="w-80"
            cardBg="gray"
          />
          <Card
            cardImg="/product2.png"
            cardHeading="Price Comparison"
            cardDesc="Compare product data from different sources and make data-driven choices. Simplify your decision-making process with Scrapeit."
            buttonText="Compare now"
            isNewFeature={false}
            cardWidth="w-80"
            cardBg="gray"
          />
        </div>
      </div>
      {/*  */}
      <div className="bg-primary pt-80 md:px-8 lg:px-12 lg:pt-40">
        <h2 className="text-center text-3xl lg:text-4xl">Subscribe & Save</h2>
        <h3 className="pb-12 pt-4 text-center text-sm lg:text-base">
          Subscribe to our premium plan and enjoy exclusive benefits. Save time,
          track more, and make smarter purchases with Scrapeit.
        </h3>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-between gap-x-3 md:gap-x-40 lg:gap-x-80">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative h-[9rem] w-[8rem] rounded-3xl bg-secondary">
                <Image
                  src={"/timer.png"}
                  alt="Timer icon"
                  width={100}
                  height={100}
                  className="absolute left-[10%] top-[10%]"
                />
              </div>
              <div className="rounded-full bg-accent px-6 py-4 text-sm font-semibold md:text-lg">
                Track Frequently
              </div>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative h-[9rem] w-[8rem] rounded-3xl bg-secondary">
                <Image
                  src={"/cancel.png"}
                  alt="Timer icon"
                  width={100}
                  height={100}
                  className="absolute left-[10%] top-[10%]"
                />
              </div>
              <div className="rounded-full bg-accent px-6 py-4 text-sm font-semibold md:text-lg">
                Cancel any time
              </div>
            </div>
          </div>

          <div className="mt-40 flex flex-col items-center">
            <button className="mb-12 rounded-full bg-accent px-8 py-3 text-lg font-semibold">
              Subcribe Now
            </button>
            <p className="text-lg">Already Subscribed?</p>
            <Link href={"/login"} className="text-xl font-semibold">
              Manage your Plan here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;