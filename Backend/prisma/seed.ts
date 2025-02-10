import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "John Doe", email: "john@example.com", password: "hashedpassword1" },
      { name: "Jane Smith", email: "jane@example.com", password: "hashedpassword2" },
      { name: "Michael Brown", email: "michael@example.com", password: "hashedpassword3" },
    ],
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
