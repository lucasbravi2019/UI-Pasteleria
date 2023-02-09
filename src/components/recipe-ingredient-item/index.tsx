import './index.scss'

import { RecipeIngredient } from '../../interfaces/recipe'

const RecipeIngredientItem = ({ ingredient, index }: { ingredient: RecipeIngredient, index: number }) => {
    return (
        <ul key={index} className="ingredients-list">
            {ingredient.name ? (
                <li className="ingredients-item"><strong>Ingrediente:</strong> {ingredient.name}</li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene nombre</li>
            )}
            {ingredient.ingredientPackage.quantity ? (
                <li className="ingredients-item"><strong>Cantidad:</strong> {ingredient.ingredientPackage.quantity} {ingredient.ingredientPackage.metric}</li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene cantidad</li>
            )}
            {ingredient.ingredientPackage.price ? (
                <li className="ingredients-item"><strong>Precio: $</strong> {ingredient.ingredientPackage.price.toFixed(2)}</li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene precio</li>
            )}
        </ul>
    )
}

export default RecipeIngredientItem