import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log("🌱 Seeding products…");

  const products = [
    {
      name: "Mug Nokava 30cl",
      description: "Céramique, compatible lave-vaisselle.",
      priceCents: 1290,
      imageUrl: "https://picsum.photos/seed/nokava-mug/800/500",
      isActive: true,
    },
    {
      name: "Café grains — 250g",
      description: "Assemblage maison, torréfaction medium.",
      priceCents: 890,
      imageUrl: "https://picsum.photos/seed/nokava-coffee/800/500",
      isActive: true,
    },
    {
      name: "Tote bag Nokava",
      description: "Coton épais, sérigraphie 1 couleur.",
      priceCents: 1590,
      imageUrl: "https://picsum.photos/seed/nokava-tote/800/500",
      isActive: true,
    },
  ];

  for (const p of products) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          description: p.description,
          priceCents: p.priceCents,
          imageUrl: p.imageUrl,
          isActive: p.isActive,
        },
      });
      console.log(`↻ updated: ${p.name}`);
    } else {
      await prisma.product.create({ data: p });
      console.log(`+ created: ${p.name}`);
    }
  }

  const count = await prisma.product.count();
  console.log(`✅ Seed OK — products in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
