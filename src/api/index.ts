import { baseUrl, GET, POST, PUT, DELETE } from "./config";

const callApi = async (endpoint: string, verb: {}) => {
    console.log(verb);
    const response = await fetch(`${baseUrl}/${endpoint}`, verb)
    try {
        switch (response.status) {
            case 200:
                console.log(response.body);
                let json = await response.json()

                return json
            default:
                return await response.json()
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getData = (endpoint: string) => callApi(endpoint, GET())

export const postData = (endpoint: string, body = {}) => callApi(endpoint, POST(body))

export const putData = (endpoint: string, body = {}) => callApi(endpoint, PUT(body))

export const deleteData = (endpoint: string) => callApi(endpoint, DELETE())

export const endpoints = {
    getAllRecipes: 'recipes',
    getRecipeByOid: (oid: string) => `recipes/${oid}`,
    createRecipe: 'recipes',
    updateRecipe: (oid: string) => `recipes/${oid}`,
    deleteRecipe: (oid: string) => `recipes/${oid}`
}