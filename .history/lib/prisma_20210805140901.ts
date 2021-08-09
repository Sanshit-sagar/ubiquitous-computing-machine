import { PrismaClient, Prisma } from "@prisma/client";

declare const global: NodeJS.Global & { prisma?: PrismaClient }

let prisma: PrismaClient
let user: Prisma.SlugCreateInput

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    prisma = global.prisma || new PrismaClient()
}

export default { prisma, user }