export interface IngredientNameDTO {
    name: string
}

export interface IngredientFieldDTO {
    id: string
    name: string
}

export interface IngredientPriceDTO {
    packageId: string
    price: number
}

export interface IngredientPackageDTO {
    ingredientId: string
    packageId: string
    price: number
}