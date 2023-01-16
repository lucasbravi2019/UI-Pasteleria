import { Recipe } from '../../interfaces/recipes'

const RecipeDetailedCard = ({recipe}: {recipe: Recipe}) => {
    return (
            <section className="container">
                <section className="recipe-card">
                    <h3 className="recipe-card__title"><strong>Receta:</strong> {recipe.name}</h3>
                    <h3 className="recipe-card__ingredients"><strong>Ingredientes</strong></h3>
                    {
                        recipe.ingredients.map((ingredient, index) => (
                            <section key={index}>
                                <ul  className="recipe-card__ingredients-list">
                                    <li className="recipe-card__ingredients-item">Ingrediente: {ingredient.ingredient.name}</li>
                                    <li className="recipe-card__ingredients-item">Precio: $ {ingredient.price}</li>
                                    <li className="recipe-card__ingredients-item">Cantidad: {ingredient.quantity}</li>
                                </ul>
                            </section>
                        ))    
                    }
                    <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {recipe.price}</p>
                </section>
            </section>
    )
}

export default RecipeDetailedCard