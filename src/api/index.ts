import {
    baseUrl,
    DELETE,
    GET,
    POST,
    PUT,
} from './config'

const callApi = async (endpoint: string, verb: {}) => {
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`, verb)
        switch (response.status) {
            case 500:
                return { error: true }
            case 404:
                return { error: true }
            case 400:
                return { error: true }
            case 201:
                return await response.json()
            case 202:
            case 204:
                return { error: false }
            case 200:
                return await response.json()
            default:
                return await response.json()
        }
    } catch (error) {
        return
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
    deleteRecipe: (oid: string) => `recipes/${oid}`,
    addIngredientToRecipe: (recipeId: string, ingredientId: string): string => `/recipes/${recipeId}/ingredient/${ingredientId}`,
    getAllIngredients: 'ingredients',
    createIngredient: 'ingredients',
    editIngredient: (oid: string) => `ingredients/${oid}`,
    deleteIngredient: (oid: string) => `ingredients/${oid}`,
    getAllPackages: 'package',
    createPackage: 'package',
    updatePackage: (oid: string) => `package/${oid}`,
    deletePackage: (oid: string) => `package/${oid}`
}