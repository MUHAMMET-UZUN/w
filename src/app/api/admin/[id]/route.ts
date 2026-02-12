import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, canManageUnit } from "@/lib/authz";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  const auth = await requireAuth();
  if (!auth.ok) return auth.res;

  const ctxAuth = auth.ctx;
  const body = await req.json();

  const existing = await prisma.slide.findUnique({
    where: { id },
    select: { unitId: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  if (!canManageUnit(ctxAuth, existing.unitId)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const updated = await prisma.slide.update({
    where: { id },
    data: {
      title: String(body.title ?? ""),
      desc: String(body.desc ?? ""),
      imageUrl: String(body.imageUrl ?? ""),
      thumbUrl: body.thumbUrl ? String(body.thumbUrl) : null,
      ctaText: String(body.ctaText ?? ""),
      ctaHref: String(body.ctaHref ?? ""),
      order: Number(body.order ?? 0),
      isActive: body.isActive ?? true,
      ...(ctxAuth.role === "SUPERADMIN" && body.unitId
        ? { unitId: String(body.unitId) }
        : {}),
    },
  });

  return NextResponse.json({ slide: updated });
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  const auth = await requireAuth();
  if (!auth.ok) return auth.res;

  const ctxAuth = auth.ctx;
  const body = await req.json();

  const existing = await prisma.slide.findUnique({
    where: { id },
    select: { unitId: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  if (!canManageUnit(ctxAuth, existing.unitId)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  if (body.action === "archive") {
    const updated = await prisma.slide.update({
      where: { id },
      data: { isArchived: true, archivedAt: new Date(), isActive: false },
    });
    return NextResponse.json({ slide: updated });
  }

  if (body.action === "publish") {
    const updated = await prisma.slide.update({
      where: { id },
      data: { isArchived: false, archivedAt: null, isActive: true },
    });
    return NextResponse.json({ slide: updated });
  }

  return NextResponse.json({ error: "BAD_ACTION" }, { status: 400 });
}
