// when a new user come in
// features and Exploere buttons will go the features
// Dashboard and signin => signin=>Dashboard
// Subcribe => sigin=>Stripe=>Dashboard
// popularTracked=>Sigin=>ProductDetails
// Track=>ProductDetails=>add to Tracklist=>Dashboard
// Product=>Products Data

// Tech Stack For This project and why
/* --Frontend;
--React;
--Tailwindcss;
--Nextjs;
--TanStackTable;
--Typescript;
--shadCn;
--chartjs;
--reacthookForm;

Backend;
--Express;
--prisma;
--NeonPsogres;
--Stripe;
--zod;
--Typescript;
--cors;
--puppeteeer;
--uploadThing;
--clerk;

--ForDeployments;
--vercel;
--render; */

import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scrapeit",
  description: "Track products easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <ClerkProvider
        appearance={{
          baseTheme: [neobrutalism],
        }}
      >
        <body className={`${sourceSans.className} h-screen`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
