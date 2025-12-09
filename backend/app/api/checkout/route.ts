// backend/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const total = Number(body.total);
    const items = Array.isArray(body.items) ? body.items : [];

    if (!Number.isFinite(total) || total <= 0 || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    // items: { productId, quantity, subtotal }
    const created = await prisma.transaction.create({
      data: {
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // ついでに sold を増やしたければここで
    await Promise.all(
      created.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            sold: { increment: item.quantity },
          },
        })
      )
    );

    return NextResponse.json({ success: true, transaction: created });
  } catch (e) {
    console.error("CHECKOUT API ERROR", e);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}