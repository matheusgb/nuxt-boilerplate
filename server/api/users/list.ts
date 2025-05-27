import prisma from '~/server/utils/prisma'
import { PaginationResult } from '~/types/pagination'
import { User } from '~/types/users'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const limit = Number(query.limit) || 10
    const page = Number(query.page) || 1
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: limit,
            orderBy: { id: 'asc' },
        }),
        prisma.user.count(),
    ])

    const response: PaginationResult<User> = {
        data: users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    }

    return response
})