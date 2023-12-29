import {
    baseUrl,
    DELETE,
    GET,
    POST,
    PUT,
} from './config'


const getEndpointWithParams = (endpoint, params) => {
    if (Object.keys(params).length === 0) {
        return endpoint
    }

    let url = new URL(`${baseUrl}/${endpoint}`)
    let searchParams = new URLSearchParams(url.search)
    Object.keys(params).forEach(key => searchParams.append(key, params[key]))

    return `${endpoint}?${searchParams.toString()}`
}

const callApi = async (endpoint, verb) => {
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`, verb)
        switch (response.status) {
            case 500:
                return await response.json()
            case 404:
                return await response.json()
            case 400:
                return await response.json()
            case 201:
                return await response.json()
            case 202:
            case 204:
                return await response.json()
            case 200:
                return await response.json()
            default:
                return await response.json()
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getData = (endpoint, params = {}) => callApi(getEndpointWithParams(endpoint, params), GET())

export const postData = (endpoint, body = {}) => callApi(endpoint, POST(body))

export const putData = (endpoint, body = {}) => callApi(endpoint, PUT(body))

export const deleteData = (endpoint) => callApi(endpoint, DELETE())

export const endpoints = {
    getAllRecipes: 'recipes',
    getRecipeById: (id) => `recipes/find-one/${id}`,
    createRecipe: 'recipes',
    updateRecipe: (id) => `recipes/${id}`,
    deleteRecipe: (id) => `recipes/${id}`,
    addIngredientToRecipe: (recipeId, ingredientId) => `ingredients/${ingredientId}/recipes/${recipeId}`,
    getAllIngredients: 'ingredients',
    createIngredient: 'ingredients',
    editIngredient: (id) => `ingredients/${id}`,
    deleteIngredient: (id) => `ingredients/${id}`,
    addPackageToIngredient: (ingredientId, packageId) => `packages/${packageId}/ingredients/${ingredientId}`,
    removePackageFromIngredients: (packageId) => `packages/${packageId}/ingredients`,
    changeIngredientPackagePrice: (ingredientPackageId) => `ingredients/${ingredientPackageId}/price`,
    getAllPackages: 'packages',
    createPackage: 'packages',
    updatePackage: 'packages',
    deletePackage: (id) => `packages/${id}`
}
