import { useCallback, useState } from "react"
import { endpoints, postData } from "../../api"
import RecipeForm from "../../components/recipe-form/RecipeForm"
import { Recipe } from "../../interfaces/recipes"
import { useAppDispatch, useAppSelector } from "../../root/hooks"
import { createRecipe } from "../home/homeSlice"
import { recipeCreationFormSelector } from "./recipeSlice"

const formInputs = {
    tituloReceta: {
        inputName: 'name',
        inputText: 'Título de receta',
        inputType: 'text'
    }
}

const resetMessages = (setSuccessMessage: Function, setErrorMessage: Function) => {
    setSuccessMessage('')
    setErrorMessage('')
}

const sendRecipeCreation = async (body: {}, successMessage: Function, errorMessage: Function, reducer: Function) => {
    resetMessages(successMessage, errorMessage)
    const creation = await postData(endpoints.createRecipe, body)
    if (creation) {
        successMessage('Se creó la receta correctamente')
        reducer()
    } else errorMessage('No se pudo crear la receta')
}


const CreateRecipe = () => {
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
        <section>
            <h1>Crear Receta</h1>
            <RecipeForm
                inputs={[formInputs.tituloReceta]}
                submitText="Crear receta"
                errorMessage={errorMessage}
                successMessage={successMessage}
                onSubmit={() => sendRecipeCreation(selector, setSuccessMessage, setErrorMessage, () => crearReceta(selector.name))}
            />
        </section>
    )
}

export default CreateRecipe