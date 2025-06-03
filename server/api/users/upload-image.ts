import { readMultipartFormData } from 'h3'
import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const id = Number(query.id);

    const form = await readMultipartFormData(event)
    const file = form?.find(f => f.name === 'file' && f.type?.startsWith('image/'))

    if (!file) {
        throw createError({ statusCode: 400, message: 'No image uploaded' })
    }

    const uploadDir = join(process.cwd(), 'public', String(query.id), 'images')
    await mkdir(uploadDir, { recursive: true })

    const filePath = join(uploadDir, file.filename!)
    await writeFile(filePath, file.data)

    return { url: `${config.public.domain}/images/${file.filename}` }
})