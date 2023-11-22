import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

function joinWithHyphens(inputString) {
  return inputString.split(" ").join("-");
}

export async function PATCH(req, params) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.params.casinoName) {
      return new NextResponse("Casino name is required", { status: 400 });
    }
    const casino = await prisma.casino.updateMany({
      where: {
        name: params.params.casinoName,
        userId,
      },
      data: {
        name: joinWithHyphens(name.toLowerCase()),
      },
    });

    return NextResponse.json(casino);
  } catch (error) {
    console.log("[CASINO_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
