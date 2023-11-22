import CasinoSwitcher from "@/components/casino-switcher";
import MainNav from "@/components/main-nav";
import prisma from "@/lib/prisma";
import { auth, UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const casinos = await prisma.casino.findMany();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-8">
        <CasinoSwitcher casinos={casinos} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
