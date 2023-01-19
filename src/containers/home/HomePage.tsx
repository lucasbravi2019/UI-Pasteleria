import './index.scss'

import { useEffect } from 'react'

import {
  endpoints,
  getData,
} from '../../api'
import RecipeCard from '../../components/recipes-card/RecipeCard'
import { Recipe } from '../../interfaces/recipes'
import {
  loadRecipes,
  recipesSelector,
} from '../../reducers/recipeSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../../root/hooks'

const getAllRecipesFromApi = () => {
    return getData(endpoints.getAllRecipes)
}


const HomePage = () => {
    const selector: Recipe[] = useAppSelector(recipesSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getAllRecipesFromApi()
            .then(data => dispatch(loadRecipes(data)))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="recipes__container">
            {
                selector && selector.length > 0 ? selector.map((recipe, index) => (
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