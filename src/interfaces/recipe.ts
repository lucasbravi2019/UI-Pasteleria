export interface Recipe {
    id: string
    name: string
    price?: number
    ingredients?: RecipeIngredient[]
}

export interface RecipeField {
    id: string
    name: string
}

export interface RecipeIngredient {
    id: string
    name: string
    package: Package
    price: Number
    quantity: Number
}

export interface IngredientMultiPackage {
    id: string
    name: string
    packages: Package[]
}

export interface RecipeName {
    name: string
}

export interface IngredientDetails {
    metric: string
    quantity: Number
}

export interface Package {
    id: string
    metric: string
    quantity: Number
    price: Number
}

export interface PackagePrice {
    price: Number
}

export interface RecipeIngredientForm {
    recipeId: string
    ingredientId: string
    metric: string
    quantity: number
}