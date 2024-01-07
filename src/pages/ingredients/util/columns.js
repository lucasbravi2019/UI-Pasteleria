export const getFilters = (ingredients) => {
    const ingredientMap = new Map()
    Object.values(ingredients).forEach(ingredient => ingredientMap.set(ingredient.name.toLowerCase(), ingredient.name))
    return Array.from(ingredientMap.values()).map(ingredient => {
        return {
            text: ingredient,
            value: ingredient
        }
    })
}