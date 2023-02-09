export interface Recipe {
    id: string
    name: string
    price?: number
    ingredients?: RecipeIngredient[]
}

export interface RecipeIngredient {
    id: string
    name: string
    ingredientPackage: IngredientPackage
}

export interface IngredientMultiPackage {
    id: string
    name: string
    packages: IngredientPackage[]
}

export interface RecipeName {
    name: string
}

export interface IngredientDetails {
    metric: string
    quantity: Number
}

export interface IngredientPackage {
    id: string
    metric: string
    price: Number
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