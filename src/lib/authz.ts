import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { createSupabaseServerClient } from "./supabase/server";

export type AuthContext = {
  userId: string;
  role: "EDITOR" | "ADMIN" | "SUPERADMIN";
  unitId: string;
};

export async function requireAuth() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 }),
    };
  }

  const userId = data.user.id;

  const profile = await prisma.userProfile.findUnique({
    where: { id: userId },
    select: { role: true, unitId: true },
  });

  if (!profile) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "NO_PROFILE" }, { status: 403 }),
    };
  }

  return {
    ok: true as const,
    ctx: { userId, role: profile.role, unitId: profile.unitId } satisfies AuthContext,
  };
}

export function canManageUnit(ctx: AuthContext, unitId: string) {
  return ctx.role === "SUPERADMIN" || ctx.unitId === unitId;
}
