import Card from "./card";

function PopularProducts() {
  return (
    <div className="flex flex-col bg-secondary px-2 py-12 md:px-8">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-8 text-4xl font-semibold lg:text-4xl">
          Popular Products
        </h2>
        <Card
          cardImg="/product1.png"
          cardHeading="Camera"
          cardDesc="$ 40.00"
          cardWidth="w-80"
          buttonText="Track Now"
          isNewFeature={false}
          cardBg="black"
        />
      </div>
      <button className="mt-16 self-center rounded-full bg-accent px-8 py-3 text-center text-lg font-semibold">
        View All
      </button>
    </div>
  );
}

export default PopularProducts;
