import './index.scss'

import {
  useEffect,
  useState,
} from 'react'

import { useParams } from 'react-router-dom'

import {
  endpoints,
  getData,
} from '../../api'
import RecipeDetailedCard
  from '../../components/recipe-detailed-card/RecipeDetailedCard'
import { Recipe } from '../../interfaces/recipes'

const getRecipeByOid = (oid: string) => {
    return getData(endpoints.getRecipeByOid(oid))
}

const ShowRecipe = () => {
    const { recipeId }: { recipeId: string } = useParams()

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
        <section className="show-recipe__container">
            <RecipeDetailedCard
                recipe={recipe}
            />
        </section>
    )
}

export default ShowRecipe