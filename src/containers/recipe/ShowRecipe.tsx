import RecipeDetailedCard from "../../components/recipe-detailed-card/RecipeDetailedCard"
import { useParams } from 'react-router-dom'
import { endpoints, getData } from "../../api"
import { useEffect, useState } from "react"
import { Recipe } from "../../interfaces/recipes"

const getRecipeByOid = (oid: string) => {
    return getData(endpoints.getRecipeByOid(oid))
}

const ShowRecipe = () => {
    const {recipeId}: {recipeId: string} = useParams()
    
    const [recipe, setRecipe] = useState<Recipe>({
        id: '',
        ingredients: [],
        name: '',
        price: 0
    })

    useEffect(() => {
        getRecipeByOid(recipeId).then(resp => setRecipe(resp))
    }, [])

    return (
        <>
            <h1>Recipe</h1>
            <RecipeDetailedCard 
                recipe={recipe}
            />
        </>
    )
}

export default ShowRecipe