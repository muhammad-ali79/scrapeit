import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import createUser from "@/libs/queries";
import { db } from "@/libs/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with .env secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  switch (evt.type) {
    case "user.created":
      await createUser({
        id: evt.data.id,
        email: evt.data.email_addresses[0].email_address,
        firstName: evt.data.first_name ?? "",
        lastName: evt.data.last_name,
        avatarUrl: evt.data.image_url,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      break;
    case "user.updated":
      await db.user.update({
        where: { id: evt.data.id },
        data: {
          email: evt.data.email_addresses[0].email_address,
          firstName: evt.data.first_name ?? "",
          lastName: evt.data.last_name,
          avatarUrl: evt.data.image_url,
        },
      });

      break;

    case "user.deleted":
      await db.user.delete({
        where: {
          id: evt.data.id,
        },
      });

      break;
  }

  return new Response("", { status: 200 });
}
