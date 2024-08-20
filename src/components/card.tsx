import Image from "next/image";

type Props = {
  cardHeading: string;
  cardDesc: string;
  cardImg: string;
  cardWidth: string;
  // cardHeight: string;
  buttonText: string;
  isNewFeature?: boolean;
  cardBg: string;
};

function Card({
  cardHeading,
  cardDesc,
  cardImg,
  // cardHeight,
  cardWidth,
  buttonText,
  isNewFeature,
  cardBg,
}: Props) {
  return (
    <div
      className={`${cardWidth} flex flex-col items-center rounded-[2rem] p-4 ${
        cardBg === "gray" ? "bg-secondary" : "bg-primary"
      }`}
    >
      <div className="relative w-full">
        <Image
          src={cardImg}
          alt="productFeature Image"
          width={300}
          height={300}
          className="z-0"
        />

        <p
          className={`${
            isNewFeature ? "block" : "hidden"
          } absolute -left-2 -top-2 z-10 rounded-full bg-secondary p-4 text-left font-semibold lg:-left-2 lg:-top-4 lg:p-8`}
        >
          New <br />
          feature
        </p>
      </div>
      <h3 className="my-4 text-lg font-semibold lg:text-xl">{cardHeading}</h3>
      <p className="mb-7 text-center text-sm text-gray-300 lg:mb-14 lg:text-base">
        {cardDesc}
      </p>
      <button className="rounded-full bg-accent px-5 py-2 text-center text-sm lg:px-10 lg:py-4 lg:text-base">
        {buttonText}
      </button>
    </div>
  );
}

export default Card;
