import './index.scss'

import {
  useCallback,
  useState,
} from 'react'

import {
  deleteData,
  endpoints,
} from '../../api'
import { Recipe } from '../../interfaces/recipes'
import { removeRecipe } from '../../reducers/recipeSlice'
import { useAppDispatch } from '../../root/hooks'
import ErrorMessage from '../error-message/ErrorMessage'
import NavigationButton from '../navigation-button/NavigationButton'
import SubmitButton from '../submit-button/SubmitButton'
import SuccessMessage from '../success-message/SuccessMessage'

const resetMessages = (setSuccessMessage: Function, setErrorMessage: Function) => {
    setSuccessMessage('')
    setErrorMessage('')
}

const borrarReceta = async (oid: string, setErrorMessage: Function, setSuccessMessage: Function, reducer: () => void) => {
    resetMessages(setSuccessMessage, setErrorMessage)
    const response = await deleteData(endpoints.deleteRecipe(oid))
    if (response) {
        setSuccessMessage('La receta pudo borrarse satisfactoriamente')
        reducer()
    } else {
        setErrorMessage('La receta no pudo borrarse')
    }
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const dispatch = useAppDispatch()

    const deleteDispatch = useCallback((oid: string) => {
        dispatch(removeRecipe(oid))
    }, [])

    return (
        <section className="recipe-card">
            {
                errorMessage && (
                    <ErrorMessage
                        message={errorMessage}
                    />
                )
            }
            {
                successMessage && (
                    <SuccessMessage
                        message={successMessage}
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
                onClick={() => borrarReceta(recipe.id, setErrorMessage, setSuccessMessage, () => deleteDispatch(recipe.id))}
            />
        </section>
    )
}

export default RecipeCard