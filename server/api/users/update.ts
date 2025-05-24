import prisma from '~/server/utils/prisma'
import { UpdateUserPayload, User } from '../../../types/users';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const id = Number(query.id);

    const body = await readBody<UpdateUserPayload>(event)

    if (!id || (!body.name && !body.email)) {
        return { error: 'ID, nome ou e-mail obrigatórios' };
    }

    const user: User = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            ...(body.name && { name: body.name }),
            ...(body.email && { email: body.email }),
        }
    })

    return user
})
