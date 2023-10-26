import Navbar from "@/components/navbar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children, params }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const casino = await prisma.casino.findFirst({
    where: {
      name: params.casinoName,
      userId,
    },
  });

  if (!casino) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
