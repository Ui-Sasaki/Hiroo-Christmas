import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' },
  });

  return Response.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, price } = body;

  if (!name || typeof price !== 'number') {
    return new Response('Invalid body', { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
    },
  });

  return Response.json(product, { status: 201 });
}