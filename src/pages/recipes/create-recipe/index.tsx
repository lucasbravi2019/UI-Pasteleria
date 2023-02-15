import {
    useEffect,
    useState,
} from 'react'

import FormCreateRecipe from '../../../components/form-create-recipe'
import RecipeCard from '../../../components/recipes-card'
import SearchInput from '../../../components/search-input'
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
    runUpdateRecipe,
} from '../../../redux/reducers/recipeSlice'

const initialValue = {
    id: '',
    name: ''
}

const RecipePage = () => {
    const dispatch = useAppDispatch()
    const recipeSelector = useAppSelector(recipesSelector)
    const recipeFilterSelect = useAppSelector(recipeFilterSelector)
    const [inputValue, setInputValue] = useState<Recipe>(initialValue)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadRecipes())
    }, [])

    const handleCreateRecipe = (recipeName: any) => dispatch(runAddRecipe(recipeName))
    const handleUpdateRecipe = (recipeName: any) => {
        dispatch(runUpdateRecipe(recipeName))
        setUpdating(false)
        setInputValue(initialValue)
    }

    useEffect(() => {
        if (!updating) {
            setInputValue(initialValue)
        }
    }, [updating])

    return (
        <section>
            <h1>Crear Receta</h1>
            <FormCreateRecipe
                initialValues={inputValue}
                onSubmit={updating ? handleUpdateRecipe : handleCreateRecipe}
                update={updating}
                setUpdate={setUpdating}
            />
            <SearchInput
                dispatch={(recipe: string) => dispatch(filterRecipesByName(recipe))}
            />
            {
                recipeSelector.length === 0 && (
                    <h3>No hay Recetas</h3>
                )
            }
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
        </section>
    )
}

export default RecipePage