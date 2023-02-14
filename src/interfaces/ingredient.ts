export interface IngredientNameDTO {
    name: string
}

export interface IngredientField {
    id: string
    name: string
}

export interface IngredientPackageDTO {
    ingredientId: string
    packageId: string
    price: number
}