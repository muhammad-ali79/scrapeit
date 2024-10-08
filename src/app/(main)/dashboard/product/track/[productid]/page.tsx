import Image from "next/image";
import AddToTrackListButton from "@/components/addToTracklistButtton";
import initScraper from "@/libs/scripts/initTrackerScraper";

async function Page({
  searchParams,
  params,
}: {
  searchParams: { data: string };
  params: { productId: string };
}) {
  const url = JSON.parse(decodeURIComponent(searchParams.data));
  const data = await initScraper(url);
  return (
    <div className="mx-20 my-20 flex flex-col items-center gap-y-12 md:flex-row md:gap-x-20">
      <Image
        src={data?.image ? data?.image : ""}
        alt="Product Image"
        width={300}
        height={300}
        className="rounded-xl"
      />
      <div>
        <p className="mb-10 text-3xl">Product Details</p>
        <h3>{data?.title}</h3>
        <h2 className="mb-28 text-4xl font-semibold">Price: ${data?.price}</h2>
        {/* <button className="rounded-2xl bg-accent px-28 py-7 text-center font-semibold md:text-xl">
          Add to Tracklist
        </button> */}
        <AddToTrackListButton
          url={url}
          productId={params.productId}
          data={data}
        />
      </div>
    </div>
  );
}
export default Page;
