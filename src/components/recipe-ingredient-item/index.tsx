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
            {ingredient.quantity ? (
                <li className="ingredients-item"><strong>Cantidad:</strong> {ingredient.quantity} {ingredient.package.package.metric}</li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene cantidad</li>
            )}
            {ingredient.price ? (
                <li className="ingredients-item"><strong>Precio: $</strong> {ingredient.price.toFixed(2)}</li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene precio</li>
            )}
        </ul >
    )
}

export default RecipeIngredientItem