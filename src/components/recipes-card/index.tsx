import './index.scss'

import { Recipe } from '../../interfaces/recipe'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runDeleteRecipe } from '../../redux/reducers/recipeSlice'
import MessagePopup from '../message-popup'
import NavigationButton from '../navigation-button'
import SubmitButton from '../submit-button'

const RecipeCard = ({ recipe, updatable, deletable, setValue, setUpdating }:
    { recipe: Recipe, updatable: boolean, deletable: boolean, setValue?: Function, setUpdating?: Function }) => {
    const dispatch = useAppDispatch()

    const handleDeleteRecipe = (id: any) => dispatch(runDeleteRecipe(id))

    const recipeCardButtons = () => (
        <section className="recipe-card__buttons">
            <NavigationButton
                link={`/recipe-show/${recipe.id}`}
                routeName="Ver receta"
                className="navigation-bar__link"
            />
            {
                updatable && setUpdating && setValue && (
                    <SubmitButton
                        buttonText='Editar Receta'
                        className='card__edit-button'
                        onClick={() => {
                            setUpdating(true)
                            setValue(recipe)
                        }}
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
    )

    return (
        <section className="recipe-card">
            <MessagePopup />

            <h3 className="recipe-card__title"><strong>Receta:</strong> {recipe.name}</h3>
            {recipe.price && recipe.price > 0 ? (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {recipe.price?.toFixed(2)} (x3)</p>
            ) : (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ 0</p>
            )}

            {
                recipeCardButtons()
            }
        </section>
    )
}

export default RecipeCard