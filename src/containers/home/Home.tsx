import { endpoints, getData } from '../../api'

import { useEffect } from 'react'
import RecipeCard from "../../components/recipes-card/RecipeCard"
import { Recipe } from '../../interfaces/recipes'
import { useAppDispatch, useAppSelector } from '../../root/hooks'
import { getRecipesFromApi, recipesSelector } from './homeSlice'


const getAllRecipesFromApi = async () => {
    return getData(endpoints.getAllRecipes)
}
    

const Home = () => {
    const selector: Recipe[] = useAppSelector(recipesSelector)
    const dispatch = useAppDispatch()

     useEffect(() => {
        getAllRecipesFromApi()
            .then(data => dispatch(getRecipesFromApi(data)))
     }, [])

    return (
        <div>
            {
                selector.map((recipe, index) => (
                    <RecipeCard 
                        key={index}
                        recipe={recipe}
                    />
                ))
            }
        </div>
    )
}

export default Home