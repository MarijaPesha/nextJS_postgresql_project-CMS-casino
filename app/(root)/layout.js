import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const casino = await prisma.casino.findFirst({
    where: {
      userId,
    },
  });

  if (casino) {
    redirect(`/${casino.name}`);
  }

  return <>{children}</>;
}
