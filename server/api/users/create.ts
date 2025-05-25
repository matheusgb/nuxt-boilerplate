import prisma from '~/server/utils/prisma'
import { CreateUserPayload, User } from '../../../types/users'
import authMiddleware from '~/server/middlewares/auth'

export default defineEventHandler(async (event) => {
    await authMiddleware(event)

    const body = await readBody<CreateUserPayload>(event)

    if (!body.name || !body.email) {
        throw createError({
            statusCode: 400,
            message: 'Nome e e-mail são obrigatórios'
        });
    }

    const user: User = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })

    return user
})
