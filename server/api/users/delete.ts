import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const id = Number(query.id);

    if (!id) {
        return { error: 'ID obrigatório' }
    }

    const userExists = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!userExists) {
        return { error: 'Usuário não encontrado' }
    }

    await prisma.user.delete({
        where: {
            id: id
        }
    })
    return { message: 'Usuário deletado com sucesso' }
})
