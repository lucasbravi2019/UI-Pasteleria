export const options = (ingredients) => {
    const defaultOption = {
        label: '--Seleccionar--',
        value: 'default',
        disabled: true,
    }
    const ingredientsOptions = Object.values(ingredients)
        .map((ingredient) => {
            if (ingredient?.packages != null) {
                return Object.values(ingredient.packages).map((pkg) => {
                    return {
                        label: `${ingredient.name} / ${pkg.package.quantity} ${pkg.package.metric}`,
                        value: pkg.ingredientPackageId,
                    }
                })
            }

            return null
        })
        .flatMap((obj) => obj)

    return [defaultOption, ...ingredientsOptions]
}
