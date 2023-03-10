import './index.scss'

import { Recipe } from '../../interfaces/recipe'
import RecipeIngredientItem from '../recipe-ingredient-item'

const RecipeDetailedCard = ({ recipe }: { recipe: Recipe }) => {
    return (
        <section className="recipe-detailed-card">
            <h1 className="recipe-detailed-card__title"><strong>Receta:</strong> {recipe.name}</h1>
            <h3 className="recipe-detailed-card__ingredients"><strong>Ingredientes</strong></h3>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <section className="recipe-detailed-card__ingredients-list__container">
                    {
                        recipe.ingredients.map((ingredient, index) => (
                            <RecipeIngredientItem
                                ingredient={ingredient}
                                index={index}
                                key={index}
                            />
                        ))
                    }
                </section>
            ) : (
                <p className="recipe-detailed-card__paragraph">Esta receta no tiene ingredientes</p>
            )}
            {recipe.price ? (
                <p className="recipe-detailed-card__paragraph"><strong>Precio: </strong>$ {recipe.price.toFixed(2)} (x3)</p>
            ) : (
                <p className="recipe-detailed-card__paragraph">Esta receta no tiene precio total</p>
            )}
        </section>
    )
}

export default RecipeDetailedCard