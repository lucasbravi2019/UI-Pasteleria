import { useEffect } from 'react'

import Form from '../../../components/form'
import RecipeCard from '../../../components/recipes-card'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    messagesSelector,
    resetMessages,
} from '../../../redux/reducers/messageSlice'
import {
    recipesSelector,
    runAddRecipe,
    runLoadRecipes,
} from '../../../redux/reducers/recipeSlice'

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
    const recipeSelector = useAppSelector(recipesSelector)

    const handleRecipeCreation = (recipeName: void) => dispatch(runAddRecipe(recipeName))
    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadRecipes())
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
            {
                recipeSelector && (
                    <section className='recipes__container'>
                        {
                            recipeSelector.map(recipe => (
                                <RecipeCard
                                    recipe={recipe}
                                    deletable={true}
                                    updatable={true}
                                    key={recipe.id}
                                />
                            ))
                        }
                    </section>
                )
            }
        </section>
    )
}

export default RecipePage