import {
    baseUrl,
    DELETE,
    GET,
    POST,
    PUT,
} from './config'


const getEndpointWithParams = (endpoint: string, params: any) => {
    if (Object.keys(params).length === 0) {
        return endpoint
    }

    let url = new URL(`${baseUrl}/${endpoint}`)
    let searchParams = new URLSearchParams(url.search)
    Object.keys(params).forEach(key => searchParams.append(key, params[key]))

    return `${endpoint}?${searchParams.toString()}`
}

const callApi = async (endpoint: string, verb: {}): Promise<any> => {
    try {
        const response: Response = await fetch(`${baseUrl}/${endpoint}`, verb)
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

export const getData = (endpoint: string, params = {}) => callApi(getEndpointWithParams(endpoint, params), GET())

export const postData = (endpoint: string, body = {}) => callApi(endpoint, POST(body))

export const putData = (endpoint: string, body = {}) => callApi(endpoint, PUT(body))

export const deleteData = (endpoint: string) => callApi(endpoint, DELETE())

export const endpoints = {
    getAllRecipes: 'recipes',
    getRecipeByOid: 'recipes/find-one',
    createRecipe: 'recipes',
    updateRecipe: (oid: string) => `recipes/${oid}`,
    deleteRecipe: (oid: string) => `recipes/delete-one/${oid}`,
    addIngredientToRecipe: (recipeId: string, ingredientId: string): string => `ingredients/${ingredientId}/recipes/${recipeId}`,
    getAllIngredients: 'ingredients',
    createIngredient: 'ingredients',
    editIngredient: (oid: string) => `ingredients/${oid}`,
    deleteIngredient: (oid: string) => `ingredients/${oid}`,
    addPackageToIngredient: (ingredientId: string, packageId: string) => `packages/${packageId}/ingredients/${ingredientId}`,
    removePackageFromIngredients: (packageId: string) => `packages/${packageId}/ingredients`,
    changeIngredientPackagePrice: (ingredientPackageId: string) => `ingredients/${ingredientPackageId}/price`,
    getAllPackages: 'packages',
    createPackage: 'packages',
    updatePackage: (oid: string) => `packages/${oid}`,
    deletePackage: (oid: string) => `packages/${oid}`
}
