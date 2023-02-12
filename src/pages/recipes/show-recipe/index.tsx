import './index.scss'

import {
    useEffect,
} from 'react'

import { useParams } from 'react-router-dom'

import RecipeDetailedCard from '../../../components/recipe-detailed-card'
import { useAppDispatch, useAppSelector } from './../../../redux/hooks/hooks';
import { runLoadRecipe } from '../../../redux/reducers/recipeSlice'
import { recipeSelector } from './../../../redux/reducers/recipeSlice';

const ShowRecipe = () => {
    const { recipeId }: { recipeId: any } = useParams()
    const dispatch = useAppDispatch()
    const recipe = useAppSelector(recipeSelector)

    useEffect(() => {
        dispatch(runLoadRecipe(recipeId))
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