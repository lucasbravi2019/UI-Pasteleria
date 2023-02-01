import './index.scss'

import { Recipe } from '../../interfaces/recipes'
import { messagesSelector } from '../../reducers/messageSlice'
import { runDeleteRecipe } from '../../reducers/recipeSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../../root/hooks'
import ErrorMessage from '../error-message/ErrorMessage'
import NavigationButton from '../navigation-button/NavigationButton'
import SubmitButton from '../submit-button/SubmitButton'
import SuccessMessage from '../success-message/SuccessMessage'

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
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {recipe.price}</p>
            )}
            <section className="recipe-card__buttons">
                <NavigationButton
                    link={`/recipe-show/${recipe.id}`}
                    routeName="Ver receta"
                    className="navigation-bar__link"
                />
                <SubmitButton
                    buttonText='Borrar receta'
                    className='recipe-card__submit-button'
                    onClick={() => handleDeleteRecipe(recipe.id)}
                />
            </section>
        </section>
    )
}

export default RecipeCard