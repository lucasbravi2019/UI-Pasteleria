import Form from '../../components/form/Form'
import { messagesSelector } from '../../reducers/messageSlice'
import { runAddRecipe } from '../../reducers/recipeSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../../root/hooks'

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