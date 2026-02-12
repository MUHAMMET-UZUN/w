import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const slides = await prisma.slide.findMany({
    where: {
      isActive: true,
      isArchived: false,
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ slides });
}
