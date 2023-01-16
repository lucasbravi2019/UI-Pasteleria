import { Recipe } from '../../interfaces/recipes'
import NavigationButton from '../navigation-button/NavigationButton'
import './index.scss'

const RecipeCard = ({recipe}: {recipe: Recipe}) => {
    return (
        <section className="container">
            <section className="recipe-card">
                <h3 className="recipe-card__title"><strong>Receta:</strong> {recipe.name}</h3>
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {recipe.price}</p>
                <NavigationButton
                    link={`/recipe-show/${recipe.id}`}
                    routeName="Ver receta"
                    className="navigation-bar__link"
                />
            </section>
        </section>
    )
}

export default RecipeCard