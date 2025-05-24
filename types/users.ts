export type CreateUserPayload = {
    name: string
    email: string
}

export type UpdateUserPayload = {
    name?: string
    email?: string
}

export type User = {
    id: number
    name: string
    email: string
}