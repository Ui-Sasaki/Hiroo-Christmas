// backend/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

type RawItem = {
  productId: unknown;
  quantity: unknown;
  subtotal: unknown;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const total = Number(body?.total);
    const rawItems: RawItem[] = Array.isArray(body?.items) ? body.items : [];

    // sanitize + validate items
    const items = rawItems
      .map((it) => ({
        productId: Number(it.productId),
        quantity: Number(it.quantity),
        subtotal: Number(it.subtotal),
      }))
      .filter(
        (it) =>
          Number.isInteger(it.productId) &&
          it.productId > 0 &&
          Number.isInteger(it.quantity) &&
          it.quantity > 0 &&
          Number.isFinite(it.subtotal) &&
          it.subtotal >= 0
      );

    if (!Number.isFinite(total) || total <= 0 || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    // Do everything in ONE DB transaction (safer on serverless)
    const created = await prisma.$transaction(async (tx) => {
      const t = await tx.transaction.create({
        data: {
          total,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              subtotal: item.subtotal,
            })),
          },
        },
        include: {
          items: { include: { product: true } },
        },
      });

      // increment sold for each product
      await Promise.all(
        items.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: { sold: { increment: item.quantity } },
          })
        )
      );

      return t;
    });

    return NextResponse.json({ success: true, transaction: created });
  } catch (e) {
    console.error("CHECKOUT API ERROR", e);
    // Return a bit more detail in dev; keep prod generic if you want
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}