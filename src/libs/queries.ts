import { db } from "./db";
import { User } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

export default async function createUser(userDetails: User) {
  const user = currentUser();
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
