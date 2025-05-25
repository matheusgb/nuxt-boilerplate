import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const id = Number(query.id);

    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'ID obrigatório'
        });
    }

    const userExists = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!userExists) {
        throw createError({
            statusCode: 404,
            message: 'Usuário não encontrado'
        });
    }

    await prisma.user.delete({
        where: {
            id: id
        }
    })
    return { message: 'Usuário deletado com sucesso' }
})
