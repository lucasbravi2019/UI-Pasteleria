import {
    useEffect,
    useState,
} from 'react'

import Form from '../../../components/form'
import RecipeCard from '../../../components/recipes-card'
import SearchInput from '../../../components/search-input'
import { FormInterface } from '../../../interfaces/form'
import { Recipe } from '../../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import { resetMessages } from '../../../redux/reducers/messageSlice'
import {
    filterRecipesByName,
    recipeFilterSelector,
    recipesSelector,
    runAddRecipe,
    runLoadRecipes,
} from '../../../redux/reducers/recipeSlice'

const formInputs = (recipe?: Recipe): FormInterface[] => {
    if (recipe) {
        return [
            {
                inputName: 'name',
                inputText: 'Titulo de receta',
                inputType: 'text',
                inputValue: recipe.name
            },
            {
                inputName: 'id',
                inputText: 'Receta id',
                inputType: 'hidden',
                inputValue: recipe.id
            }
        ]
    } else {
        return [
            {
                inputName: 'name',
                inputText: 'Título de receta',
                inputType: 'text',
                inputValue: ''
            }
        ]
    }
}
const RecipePage = () => {
    const dispatch = useAppDispatch()
    const recipeSelector = useAppSelector(recipesSelector)
    const recipeFilterSelect = useAppSelector(recipeFilterSelector)
    const [inputValue, setInputValue] = useState<Recipe>()
    const [inputs, setInputs] = useState<FormInterface[]>([])
    const [updating, setUpdating] = useState(false)

    const handleRecipeCreation = (recipeName: void) => dispatch(runAddRecipe(recipeName))
    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadRecipes())
    }, [])

    useEffect(() => {
        setInputs(formInputs(inputValue))
    }, [inputValue])

    return (
        <section>
            <h1>Crear Receta</h1>
            {
                <Form
                    inputs={inputs}
                    submitText={updating ? 'Editar receta' : 'Crear Receta'}
                    onSubmit={(recipeName: void) => handleRecipeCreation(recipeName)}
                />
            }
            {
                (
                    <>
                        <SearchInput
                            dispatch={(recipe: string) => dispatch(filterRecipesByName(recipe))}
                        />
                        {
                            recipeFilterSelect && recipeFilterSelect.length > 0 && (
                                <section className='recipes__container'>
                                    {
                                        recipeFilterSelect.map(recipe => (
                                            <RecipeCard
                                                recipe={recipe}
                                                deletable={true}
                                                updatable={true}
                                                setValue={setInputValue}
                                                setUpdating={setUpdating}
                                                key={recipe.id}
                                            />
                                        ))
                                    }
                                </section>
                            )
                        }
                        {
                            recipeSelector && recipeFilterSelect.length == 0 && (
                                <section className='recipes__container'>
                                    {
                                        recipeSelector.map(recipe => (
                                            <RecipeCard
                                                recipe={recipe}
                                                deletable={true}
                                                updatable={true}
                                                setValue={setInputValue}
                                                setUpdating={setUpdating}
                                                key={recipe.id}
                                            />
                                        ))
                                    }
                                </section>
                            )
                        }
                    </>
                )
            }
        </section>
    )
}

export default RecipePage