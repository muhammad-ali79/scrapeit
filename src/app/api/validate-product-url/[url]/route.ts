import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } },
) {
  try {
    console.log("Params", params);
    const url = (params?.url ?? "").trim();
    console.log("Received URL:", url.length);

    if (url === "") {
      return NextResponse.json(
        { error: "Please enter a valid URL" },
        { status: 400 },
      );
    }

    const productId = url.match(/\/dp\/([A-Z0-9]+)/)?.[1].toString() ?? "";
    console.log("Product ID:", productId);

    if (!productId || productId === "") {
      return NextResponse.json(
        { error: "Failed to get Product ID" },
        { status: 400 },
      );
    }

    return NextResponse.json({ productId, url }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

// https://www.amazon.com/HOFFREE-Computer-Footrest-Reclining-Headrest/dp/B0CRH5VLVG/ref=sr_1_7?_encoding=UTF8&sr=8-7
