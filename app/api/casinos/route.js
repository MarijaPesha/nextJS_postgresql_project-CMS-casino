import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

function joinWithHyphens(inputString) {
  return inputString.split(" ").join("-");
}

export async function POST(req) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    // 1. when query the database to check for duplicate record,
    // always use the lowercase version of the name for comparison
    const isExistingCasino = await prisma.casino.findUnique({
      where: { name: name.toLowerCase() },
    });

    if (isExistingCasino) {
      return new NextResponse("Casino name already in use.", { status: 412 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 403 });
    }

    if (!name || name.trim() === "") {
      return new NextResponse("Name is required!", { status: 400 });
    }

    const casino = await prisma.casino.create({
      data: {
        // 2. when receive a name to be stored in the database,
        // convert it to lowercase before saving it
        name: joinWithHyphens(name.toLowerCase()),
        userId,
      },
    });

    return NextResponse.json(casino);
  } catch (error) {
    console.log("[CASINOS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// 1. + 2. in this way, we prevent the duplication of casino names regardless of case sensitivity
