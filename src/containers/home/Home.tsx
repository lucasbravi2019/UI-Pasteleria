import { endpoints, getData } from '../../api'

import { useEffect } from 'react'
import RecipeCard from "../../components/recipes-card/RecipeCard"
import { Recipe } from '../../interfaces/recipes'
import { useAppDispatch, useAppSelector } from '../../root/hooks'
import { getRecipesFromApi, recipesSelector } from './homeSlice'
import './index.scss'

const getAllRecipesFromApi = async () => {
    return getData(endpoints.getAllRecipes)
}


const Home = () => {
    const selector: Recipe[] = useAppSelector(recipesSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getAllRecipesFromApi()
            .then(data => {
                if (data) {
                    dispatch(getRecipesFromApi(data))
                }
            })
    }, [])

    return (
        <div className="recipes__container">
            {
                selector ? selector.map((recipe, index) => (
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

export default Home