export const getFilters = (recipes) => {
    const recipeMap = new Map()
    Object.values(recipes).forEach((recipe) =>
        recipeMap.set(recipe.name.toLowerCase(), recipe.name)
    )
    return Array.from(recipeMap.values()).map((recipe) => {
        return {
            text: recipe,
            value: recipe,
        }
    })
}
