import { prisma } from "~/db.server"

export async function getExpenses() {
  return prisma.expense.findMany()
}
