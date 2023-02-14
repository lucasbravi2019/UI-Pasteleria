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
} from '../../../redux/reducers/recipeSlice'

const RecipePage = () => {
    const dispatch = useAppDispatch()
    const recipeSelector = useAppSelector(recipesSelector)
    const recipeFilterSelect = useAppSelector(recipeFilterSelector)
    const [, setInputValue] = useState<Recipe>()
    const [, setUpdating] = useState(false)

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadRecipes())
    }, [])

    const handleCreateRecipe = (recipeName: any) => dispatch(runAddRecipe(recipeName))

    return (
        <section>
            <h1>Crear Receta</h1>
            {
                <FormCreateRecipe
                    initialValues={{ name: '' }}
                    onSubmit={handleCreateRecipe}
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