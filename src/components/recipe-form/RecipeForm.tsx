import { useCallback, useState } from "react"
import { endpoints, postData } from "../../api"
import { recipeCreationFormSelector, setRecipeName } from "../../containers/create-recipe/recipeSlice"
import { createRecipe } from "../../containers/home/homeSlice"
import { Recipe } from "../../interfaces/recipes"
import { useAppDispatch, useAppSelector } from "../../root/hooks"
import ErrorMessage from "../error-message/ErrorMessage"
import FormInput from "../form-input/FormInput"
import FormLabel from "../form-label/FormLabel"
import SubmitButton from "../submit-button/SubmitButton"
import SuccessMessage from "../success-message/SuccessMessage"
import './index.scss'

const sendRecipeCreation = async (body: {}, successMessage: Function, errorMessage: Function, reducer: Function) => {
    const creation = await postData(endpoints.createRecipe, body)
    if (creation) {
        successMessage('Se creó la receta correctamente')
        reducer()
    } else errorMessage('No se pudo crear la receta')
    setTimeout(() => {
        successMessage('')
        errorMessage('')
    }, 4500)
}

const RecipeForm = ({ submitText, inputs }: { submitText: string, inputs: [{ inputName: string, inputText: string, inputType: string }] }) => {
    const selector = useAppSelector(recipeCreationFormSelector)
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const crearReceta = useCallback((recipeName: string) => {
        const receta: Recipe = {
            id: '',
            ingredients: [],
            name: recipeName,
            price: 0
        }
        dispatch(createRecipe(receta))
    }, [])

    return (
        <form>
            {
                inputs != null && inputs.map((input, index) => (
                    <div className="form__fields" key={index}>
                        <FormLabel
                            inputName={input.inputName}
                            inputText={input.inputText}
                        />
                        <FormInput
                            inputType={input.inputType}
                            inputText={input.inputText}
                            reducer={setRecipeName}
                        />
                    </div>
                ))
            }

            <SubmitButton
                buttonText={submitText}
                className={'form__submit-button'}
                onClick={() => sendRecipeCreation(selector, setSuccessMessage, setErrorMessage, () => crearReceta(selector.name))}
            />
            {
                successMessage && (
                    <SuccessMessage
                        message={successMessage}
                    />
                )
            }
            {
                errorMessage && (
                    <ErrorMessage
                        message={errorMessage}
                    />
                )
            }
        </form>
    )
}

export default RecipeForm