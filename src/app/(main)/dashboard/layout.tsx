import React from "react";
import { UserButton } from "@clerk/nextjs";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <h2>Dashboard Layout</h2>
      <UserButton />
    </div>
  );
}
