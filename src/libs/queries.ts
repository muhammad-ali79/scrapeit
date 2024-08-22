"use server";

import { db } from "./db";
import { User } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function createUser(userDetails: User) {
  const user = await currentUser();
  if (!user) return;
  try {
    const userCreated = await db.user.create({
      data: userDetails,
    });

    return userCreated;
  } catch (error) {
    console.error("Error creating new user", error);
    throw new Error("Failed to create a user");
  }
}

export async function getFilteredTrackedProducts(query: string, page: string) {}

export const addProduct = async (
  url: string,
  productId: string,
  data:
    | {
        title: string;
        price: number;
        image: string;
      }
    | undefined,
) => {
  const user = await currentUser();

  const isProductAlreadyAvilable = await db.product.findFirst({
    where: { storeId: productId },
  });
  /*     
  new keyword will inisiate new Error object= just using Error()
  but new is considered is a good Practice */
  if (isProductAlreadyAvilable)
    throw new Error("Product is already in Tracklist");

  console.log(user?.id);

  await db.tracklist.upsert({
    where: {
      userId: user?.id,
    },
    update: {},
    create: {
      user: { connect: { id: user?.id ?? "" } },
    },
  });

  const getTracklistId = async () => {
    const tracklist = await db.tracklist.findFirst({
      where: { userId: user?.id },
      select: { id: true },
    });
    return tracklist?.id;
  };
  await db.product.create({
    data: {
      storeId: productId,
      title: data?.title ?? "",
      imageUrl: data?.image ?? "",
      initialPrice: data?.price ?? 0,
      tracklistId: (await getTracklistId()) ?? "",
      lastCheckedAt: new Date(),
      productUrl: url,
      priceChangeRecords: {
        create: {
          //  in nested queries prisma will automatically figure out relatioships
          price: data?.price ?? 0,
        },
      },
    },
  });

  redirect("/");
};

export async function check() {
  const { userId } = auth();
  console.log(userId);
}
