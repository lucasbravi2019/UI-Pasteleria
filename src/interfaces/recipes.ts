export interface Recipe {
    id: string
    name: string
    price: number
    ingredients: RecipeIngredient[]
}

export interface RecipeIngredient {
    ingredient: Ingredient
    price: number
    quantity: number
    metric: string
}

export interface Ingredient {
    name: string
    metric: string
    price: number
}

export interface RecipeName {
    name: string
}