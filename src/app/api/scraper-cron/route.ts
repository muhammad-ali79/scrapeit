import { db } from "@/libs/db";
import scraper from "@/libs/scripts/scraper";

// TODO: check for parameters
export async function POST() {
  const currentTime = new Date();
  const sixHoursAgo = new Date(currentTime.getTime() - 6 * 60 * 60 * 1000);
  const productToProcceed = await db.product.findFirst({
    where: {
      lastCheckedAt: {
        gte: sixHoursAgo,
      },
    },

    orderBy: {
      // smallest timestamp to oldest timestamp
      lastCheckedAt: "asc",
    },
  });

  try {
    if (productToProcceed) {
      const data = await scraper(productToProcceed?.productUrl);
      if (!data?.price) throw new Error("failed to scrape the Price");

      await db.priceChangeRecord.create({
        data: {
          price: data?.price,
          product: { connect: { id: productToProcceed?.id } },
        },
      });

      await db.product.update({
        where: { id: productToProcceed.id },
        data: { lastCheckedAt: currentTime },
      });

      return Response.json(
        { message: "product updated successfully" },
        { status: 200 },
      );
    } else
      Response.json(
        { message: "No products due for processing" },
        { status: 200 },
      );
  } catch (error) {
    Response.json({ error: error }, { status: 500 });
  }
}
