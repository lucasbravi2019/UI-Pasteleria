import { useCallback, useState } from 'react'
import { deleteData, endpoints } from '../../api'
import { deleteRecipe } from '../../containers/home/homeSlice'
import { Recipe } from '../../interfaces/recipes'
import { useAppDispatch } from '../../root/hooks'
import ErrorMessage from '../error-message/ErrorMessage'
import NavigationButton from '../navigation-button/NavigationButton'
import SubmitButton from '../submit-button/SubmitButton'
import './index.scss'

const borrarReceta = async (oid: string, setErrorMessage: Function, reducer: () => void) => {
    const response = await deleteData(endpoints.deleteRecipe(oid))
    if (!response) {
        setErrorMessage('La receta no pudo borrarse')
        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
        return
    }
    reducer()
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useAppDispatch()

    const deleteDispatch = useCallback((oid: string) => {
        dispatch(deleteRecipe(oid))
    }, [])

    return (
        <section className="recipe-card">
            {
                errorMessage && (
                    <ErrorMessage
                        message='La receta no pudo borrarse'
                    />
                )
            }
            <h3 className="recipe-card__title"><strong>Receta:</strong> {recipe.name}</h3>
            {recipe.price && (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {recipe.price}</p>
            )}
            <NavigationButton
                link={`/recipe-show/${recipe.id}`}
                routeName="Ver receta"
                className="navigation-bar__link"
            />
            <SubmitButton
                buttonText='Borrar receta'
                className=''
                onClick={() => borrarReceta(recipe.id, setErrorMessage, () => deleteDispatch(recipe.id))}
            />
        </section>
    )
}

export default RecipeCard