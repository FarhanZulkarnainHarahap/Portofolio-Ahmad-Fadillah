import type { ReactNode } from "react";
import { Footer } from "@/components/user/Footer";
import { NavBar } from "@/components/user/NavBar";

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
