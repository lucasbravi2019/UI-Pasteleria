import './index.scss'

import { Recipe } from '../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks/hooks'
import { messagesSelector } from '../../redux/reducers/messageSlice'
import { runDeleteRecipe } from '../../redux/reducers/recipeSlice'
import ErrorMessage from '../error-message'
import NavigationButton from '../navigation-button'
import SubmitButton from '../submit-button'
import SuccessMessage from '../success-message'

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const dispatch = useAppDispatch()
    const messageSelector = useAppSelector(messagesSelector)

    const handleDeleteRecipe = (id: any) => dispatch(runDeleteRecipe(id))

    return (
        <section className="recipe-card">
            {
                messageSelector.errorMessage && (
                    <ErrorMessage
                        message={messageSelector.errorMessage}
                    />
                )
            }
            {
                messageSelector.successMessage && (
                    <SuccessMessage
                        message={messageSelector.successMessage}
                    />
                )
            }
            <h3 className="recipe-card__title"><strong>Receta:</strong> {recipe.name}</h3>
            {recipe.price && (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {recipe.price.toFixed(2)}</p>
            )}
            <section className="recipe-card__buttons">
                <NavigationButton
                    link={`/recipe-show/${recipe.id}`}
                    routeName="Ver receta"
                    className="navigation-bar__link"
                />
                <SubmitButton
                    buttonText='Borrar receta'
                    className='card__submit-button'
                    onClick={() => handleDeleteRecipe(recipe.id)}
                />
            </section>
        </section>
    )
}

export default RecipeCard