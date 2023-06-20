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
    runLoadRecipes,
} from '../../redux/reducers/recipeSlice'

const HomePage = () => {
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
            {
                recipeFilterSelect != null && recipeFilterSelect.length === 0 && (
                    <h1>Actualmente no hay recetas</h1>
                )
            }
            <div className="recipes__container">
                {
                    recipeFilterSelect != null && recipeFilterSelect.length > 0 && recipeFilterSelect.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            deletable={false}
                            updatable={false}
                            recipe={recipe}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default HomePage