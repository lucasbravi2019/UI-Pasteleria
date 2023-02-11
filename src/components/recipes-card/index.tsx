import './index.scss'

import { useEffect } from 'react'

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

const RecipeCard = ({ recipe, updatable, deletable }: { recipe: Recipe, updatable: boolean, deletable: boolean }) => {
    const dispatch = useAppDispatch()
    const messageSelector = useAppSelector(messagesSelector)

    const handleDeleteRecipe = (id: any) => dispatch(runDeleteRecipe(id))

    useEffect(() => {
        console.log(recipe);

    }, [recipe])

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
            {recipe.price && recipe.price > 0 ? (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {recipe.price?.toFixed(2)}</p>
            ) : (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ 0</p>
            )}
            <section className="recipe-card__buttons">
                <NavigationButton
                    link={`/recipe-show/${recipe.id}`}
                    routeName="Ver receta"
                    className="navigation-bar__link"
                />
                {
                    updatable && (
                        <SubmitButton
                            buttonText='Editar Receta'
                            className='card__edit-button'
                            onClick={() => console.log('edit')}
                        />
                    )
                }
                {
                    deletable && (
                        <SubmitButton
                            buttonText='Borrar Receta'
                            className='card__delete-button'
                            onClick={() => handleDeleteRecipe(recipe.id)}
                        />
                    )
                }
            </section>
        </section>
    )
}

export default RecipeCard