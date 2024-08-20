"use client";

import { addProduct } from "@/libs/queries";

type props = {
  // handler is a function with no parameters and return promise that when resolve does not return any value
  // handler: () => Promise<void>;

  url: string;
  productId: string;
  data:
    | {
        title: string;
        price: number;
        image: string;
      }
    | undefined;
};

export default function AddToTrackListButton({ url, productId, data }: props) {
  // just passing the reference to addProduct thats why await is not required
  console.log(url, productId, data);

  return (
    <button
      onClick={async () => {
        console.log(url, productId, data);
        await addProduct(url, productId, data);
      }}
      className="rounded-2xl bg-accent px-28 py-7 text-center font-semibold md:text-xl"
    >
      add
    </button>
  );
}
