import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)
    if (!id) {
        throw createError({ statusCode: 400, message: 'User ID is required' })
    }
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    })
    if (!user) {
        throw createError({ statusCode: 404, message: 'User not found' })
    }
    return user
})