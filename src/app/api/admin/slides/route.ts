import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/authz";

export async function GET() {
  const auth = await requireAuth();
  if (!auth.ok) return auth.res; // 🔐 login yoksa burada biter

  const { role, unitId } = auth.ctx;

  const slides = await prisma.slide.findMany({
    where: role === "SUPERADMIN" ? {} : { unitId },
    orderBy: [{ isArchived: "asc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ slides });
}

export async function POST(req: Request) {
  const auth = await requireAuth();
  if (!auth.ok) return auth.res; // 🔐

  const { role, unitId: ctxUnitId } = auth.ctx;
  const body = await req.json();

  const unitId =
    role === "SUPERADMIN" && body.unitId
      ? String(body.unitId)
      : ctxUnitId;

  const slide = await prisma.slide.create({
    data: {
      title: String(body.title ?? ""),
      desc: String(body.desc ?? ""),
      imageUrl: String(body.imageUrl ?? ""),
      thumbUrl: body.thumbUrl ? String(body.thumbUrl) : null,
      ctaText: String(body.ctaText ?? ""),
      ctaHref: String(body.ctaHref ?? ""),
      order: Number(body.order ?? 0),
      isActive: body.isActive ?? true,
      isArchived: false,
      archivedAt: null,
      unitId,
    },
  });

  return NextResponse.json({ slide }, { status: 201 });
}
