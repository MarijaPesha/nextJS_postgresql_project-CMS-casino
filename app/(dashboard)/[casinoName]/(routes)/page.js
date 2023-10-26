import prisma from "@/lib/prisma";

const DashboardPage = async ({ params }) => {
  const casino = await prisma.casino.findFirst({
    where: { name: params.casinoName },
  });

  return <div className="capitalize"> Active Casino: {casino?.name}</div>;
};

export default DashboardPage;
