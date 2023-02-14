import './index.scss'

import { useEffect } from 'react'

import RecipeCard from '../../components/recipes-card'
import SearchInput from '../../components/search-input'
import { Recipe } from '../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks/hooks'
import {
    filterRecipesByName,
    recipeFilterSelector,
    recipesSelector,
    runLoadRecipes,
} from '../../redux/reducers/recipeSlice'

const HomePage = () => {
    const recipeSelector: Recipe[] = useAppSelector(recipesSelector)
    const recipeFilterSelect: Recipe[] = useAppSelector(recipeFilterSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(runLoadRecipes())
    }, [])

    return (
        <>
            <SearchInput
                dispatch={(recipe: string) => dispatch(filterRecipesByName(recipe))}
            />
            <div className="recipes__container">
                {
                    recipeFilterSelect && recipeFilterSelect.length > 0 && recipeFilterSelect.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            deletable={false}
                            updatable={false}
                            recipe={recipe}
                        />
                    ))
                }
                {
                    recipeSelector && recipeSelector.length > 0 && recipeFilterSelect && recipeFilterSelect.length === 0 && recipeSelector.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            deletable={false}
                            updatable={false}
                            recipe={recipe}
                        />
                    ))
                }
                {
                    recipeSelector.length < 1 && (
                        <h1>Actualmente no hay recetas</h1>
                    )
                }
            </div>
        </>
    )
}

export default HomePage