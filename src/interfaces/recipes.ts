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
<<<<<<< HEAD
    quantity: Number
=======
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50
}

export interface RecipeName {
    name: string
}