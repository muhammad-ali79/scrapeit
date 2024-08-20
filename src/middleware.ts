import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getProductIdAndURl } from "@/app/api/validate-product-url/[url]/route";
export default clerkMiddleware((auth, req) => {
  const requestUrl = req.nextUrl;
  const host = req.headers.get("host");
  const dashboardSubdomain = `dashboard.${process.env.NEXT_PUBLIC_ROOT_URL}`;

  if (
    auth().userId &&
    requestUrl.pathname === "/" &&
    host !== dashboardSubdomain
  ) {
    const url = new URL(req.url);
    url.host = dashboardSubdomain;
    // console.log("host", url.host, url.hostname);
    // console.log("URL", url);
    return NextResponse.redirect(url);
  }

  if (req.headers.get("host") === dashboardSubdomain) {
    const searchParams = requestUrl.searchParams.toString();

    if (requestUrl.pathname.startsWith("/product")) {
      // console.log("starting from product");

      const { productId } = getProductIdAndURl();
      if (productId === "") return;
      return NextResponse.rewrite(
        new URL(
          `/dashboard/product/track/${productId}/${searchParams.length > 0 ? searchParams : ""}`,
          req.url,
        ),
      );
    }

    const urlWithSearchParams = `/dashboard/${searchParams.length > 0 ? searchParams : ""}`;
    return NextResponse.rewrite(new URL(urlWithSearchParams, req.url));
  }
});

export const config = {
  // when middleware is running on api on subdomains fetching apis return html pages instead of JSON
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],

  // so excludeing running on api
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
