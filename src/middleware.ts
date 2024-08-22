import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*) ",
  "/api/webhooks/(.*)",
]);
export default clerkMiddleware(
  (auth, request) => {
    if (!isPublicRoute(request)) {
      auth().protect();
    }

    const requestUrl = request.nextUrl;
    if (auth().userId && !requestUrl.pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  },
  { debug: true },
);

export const config = {
  // when middleware is running on api on subdomains fetching apis return html pages instead of JSON
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // so excludeing running on api
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next/static|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// PROBLEM: getting the html
// TRY: what is matcher  FIND: that middleware  run for every route but we just to configure to run on specfic paths

/* (auth, req) => {
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

      if (getProductId === "") return;
      return NextResponse.rewrite(
        new URL(
          `/dashboard/product/track/${getProductId}/${searchParams.length > 0 ? searchParams : ""}`,
          req.url,
        ),
      );
    }

    const urlWithSearchParams = `/dashboard/${searchParams.length > 0 ? searchParams : ""}`;
    return NextResponse.rewrite(new URL(urlWithSearchParams, req.url));
  }
} */
