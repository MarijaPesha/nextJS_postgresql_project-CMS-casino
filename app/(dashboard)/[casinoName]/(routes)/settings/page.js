import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

const SettingPage = async ({ params }) => {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={casino} />
      </div>
    </div>
  );
};

export default SettingPage;
