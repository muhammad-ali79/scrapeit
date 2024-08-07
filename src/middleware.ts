import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const requestUrl = req.nextUrl;
  const host = req.headers.get("host");
  // const hostname = requestUrl.hostname;
  const dashboardSubdomain = `dashboard.${process.env.NEXT_PUBLIC_ROOT_URL}`;
  // console.log(dashboardSubdomain);
  if (
    auth().userId &&
    requestUrl.pathname === "/" &&
    host !== dashboardSubdomain
  ) {
    const url = new URL(req.url);
    url.host = dashboardSubdomain;
    console.log("host", url.host, url.hostname);
    console.log("URL", url);
    return NextResponse.redirect(url);
  }
  if (req.headers.get("host") === dashboardSubdomain) {
    const searchParams = requestUrl.searchParams.toString();
    const urlWithSearchParams = `/dashboard/${searchParams.length > 0 ? searchParams : ""}`;
    return NextResponse.rewrite(new URL(urlWithSearchParams, req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
