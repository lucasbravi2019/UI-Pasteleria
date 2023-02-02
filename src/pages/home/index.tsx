import './index.scss'

import { useEffect } from 'react'

import RecipeCard from '../../components/recipes-card'
import { Recipe } from '../../interfaces/recipe'
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/hooks/hooks'
import {
  recipesSelector,
  runLoadRecipes,
} from '../../redux/reducers/recipeSlice'

const HomePage = () => {
    const recipeSelector: Recipe[] = useAppSelector(recipesSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(runLoadRecipes())
    }, [])

    return (
        <div className="recipes__container">
            {
                recipeSelector && recipeSelector.length > 0 ? recipeSelector.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        recipe={recipe}
                    />
                )) : (
                    <h1>Actualmente no hay recetas</h1>
                )
            }
        </div>
    )
}

export default HomePage