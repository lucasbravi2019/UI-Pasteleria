export interface Recipe {
    id: string
    name: string
    price?: number
    ingredients?: RecipeIngredient[]
}

export interface RecipeIngredient {
    ingredient: Ingredient
    price: number
    quantity: number
    metric: string
}

export interface Ingredient {
    id: string
    name: string
    metric: string
    price: Number
    quantity: Number
}

export interface RecipeName {
    name: string
}