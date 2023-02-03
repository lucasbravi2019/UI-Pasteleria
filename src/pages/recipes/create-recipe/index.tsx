import { useEffect } from 'react'

import Form from '../../../components/form'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    messagesSelector,
    resetMessages,
} from '../../../redux/reducers/messageSlice'
import { runAddRecipe } from '../../../redux/reducers/recipeSlice'

const formInputs = [
    {
        inputName: 'name',
        inputText: 'Título de receta',
        inputType: 'text'
    }
]


const RecipePage = () => {
    const dispatch = useAppDispatch()
    const messageSelector = useAppSelector(messagesSelector)

    const handleRecipeCreation = (recipeName: void) => dispatch(runAddRecipe(recipeName))
    useEffect(() => {
        dispatch(resetMessages())
    }, [])

    return (
        <section>
            <h1>Crear Receta</h1>
            <Form
                inputs={formInputs}
                submitText="Crear receta"
                errorMessage={messageSelector.errorMessage}
                successMessage={messageSelector.successMessage}
                onSubmit={(recipeName: void) => handleRecipeCreation(recipeName)}
            />
        </section>
    )
}

export default RecipePage