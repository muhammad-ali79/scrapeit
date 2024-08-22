"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function ValidateProductUrl() {
  const urlRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleUrl = async function () {
    const reqUrl = urlRef.current?.value ?? "";
    try {
      const req = await fetch(
        `/api/validate-product-url/${encodeURIComponent(reqUrl)}`,
        {
          method: "GET",
        },
      );
      const { productId, url } = await req.json();

      router.push(
        // `http://dashboard.${process.env.NEXT_PUBLIC_ROOT_URL}/product/track/${productId}`,

        `http://${process.env.NEXT_PUBLIC_ROOT_URL}/dashboard/product/track/${productId}?data=${JSON.stringify(encodeURIComponent(url))}`,
      );
      return router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="my-8 flex flex-col items-start justify-start">
      <h3 className="mb-12 text-start text-xl font-semibold md:text-2xl">
        Add New Products to Tracklist
      </h3>
      <div className="flex flex-col items-start gap-x-8 gap-y-4 md:flex-row md:items-center md:gap-y-0">
        <input
          type="text"
          placeholder="Enter Product URL"
          className="h-[7vh] w-[50vw] rounded-2xl bg-secondary px-4 placeholder:text-xs placeholder:text-gray-100 focus:border-none focus:outline-none md:w-[30vw] md:placeholder:text-base"
          ref={urlRef}
        />

        <button
          onClick={handleUrl}
          className="rounded-full bg-accent px-4 py-2 font-semibold"
        >
          Track Product
        </button>
      </div>
      {/* {errorState && (
        <p className="mt-4 text-xl font-semibold text-red-500">{errorState}</p>
      )} */}
    </div>
  );
}
