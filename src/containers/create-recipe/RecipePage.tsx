import { useCallback, useState } from "react"
import { endpoints, postData } from "../../api"
import Form from "../../components/form/Form"
import { RecipeName } from "../../interfaces/recipes"
import { useAppDispatch } from "../../root/hooks"
import { addRecipe } from "../../reducers/recipeSlice"

const formInputs = [
    {
        inputName: 'name',
        inputText: 'Título de receta',
        inputType: 'text'
    }
]

export const resetMessages = (setSuccessMessage: Function, setErrorMessage: Function) => {
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


const RecipePage = () => {
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const crearReceta = useCallback((receta: RecipeName) => {
        sendRecipeCreation(receta, setSuccessMessage, setErrorMessage, () => dispatch(addRecipe(receta)))
    }, [])

    return (
        <section>
            <h1>Crear Receta</h1>
            <Form
                inputs={formInputs}
                submitText="Crear receta"
                errorMessage={errorMessage}
                successMessage={successMessage}
                onSubmit={crearReceta}
            />
        </section>
    )
}

export default RecipePage