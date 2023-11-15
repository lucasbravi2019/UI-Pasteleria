import { normalize, schema } from 'normalizr'

export const normalizeRecipes = (recipes) => {
    const packageSchema = new schema.Entity('packages')
    const ingredientSchema = new schema.Entity('ingredients', {
        package: packageSchema
    })
    const recipeSchema = new schema.Entity('recipes', {
        ingredients: [ingredientSchema]
    })

    return normalize(recipes, [recipeSchema])
}
