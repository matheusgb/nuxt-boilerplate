import { H3Event } from 'h3'

export default async function authMiddleware(event: H3Event) {
    console.log('Middleware: validando login...');

    const auth = event.node.req.headers['authorization'];
    if (!auth || auth !== 'Bearer fake-token') {
        throw createError({
            statusCode: 401,
            message: 'Acesso negado.'
        });
    }
}