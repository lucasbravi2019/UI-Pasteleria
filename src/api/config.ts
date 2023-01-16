export const GET = () => {
    return { method: 'GET' }
}

export const POST = (body = {}) => {
    return {
        method: 'POST',
        body: body
    }
}

export const PUT = (body = {}) => {
    return {
        method: 'PUT',
        body: body
    }
}

export const DELETE = () => {
    return { method: 'DELETE' }
}

export const baseUrl = 'http://localhost:8080'

