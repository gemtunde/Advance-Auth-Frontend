"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Asidebar from "./_components/Asidebar";
import Header from "./_components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Asidebar />
      <SidebarInset>
        <main className="w-full">
          <Header />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
