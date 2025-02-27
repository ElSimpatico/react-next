import { PrismaClient } from "@prisma/client";

import { technologiesData } from "./data/technologies.js";

const prisma = new PrismaClient();

async function main() {
    await prisma.technology.createMany({
        data: technologiesData,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
