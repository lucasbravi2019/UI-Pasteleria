import {
  useCallback,
  useState,
} from 'react'

import {
  endpoints,
  postData,
} from '../../api'
import Form from '../../components/form/Form'
import {
  Recipe,
  RecipeName,
} from '../../interfaces/recipes'
import { addRecipe } from '../../reducers/recipeSlice'
import { useAppDispatch } from '../../root/hooks'

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
    const response = await postData(endpoints.createRecipe, body)
    if (response.error) {
        errorMessage('No se pudo crear la receta')
    } else {
        successMessage('Se creó la receta correctamente')
        reducer(response)
    }
}


const RecipePage = () => {
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const crearReceta = useCallback((receta: RecipeName) => {
        sendRecipeCreation(receta, setSuccessMessage, setErrorMessage, (id: string) => dispatch(addRecipe({ id: id, name: receta.name } as Recipe)))
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