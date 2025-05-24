import prisma from '~/server/utils/prisma'
import { CreateUserPayload, User } from '../../../types/users'

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateUserPayload>(event)

    if (!body.name || !body.email) {
        return { error: 'Nome e e-mail são obrigatórios' }
    }

    const user: User = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })

    return user
})
