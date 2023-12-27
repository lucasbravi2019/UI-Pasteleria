import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { runLoadRecipe } from "./slice"
import { selectRecipeIdSelector, selectRecipeNameSelector, selectRecipePriceSelector, selectShowRecipeSelector } from "./selectors"
import { Empty } from "antd"

const ShowRecipe = ({ match }) => {
    const dispatch = useDispatch()
    const recipeSelector = useSelector(selectShowRecipeSelector)
    const recipeIdSelector = useSelector(selectRecipeIdSelector)
    const recipeNameSelector = useSelector(selectRecipeNameSelector)
    const recipePriceSelector = useSelector(selectRecipePriceSelector)

    useEffect(() => {
        const recipeId = match.params.recipeId
        dispatch(runLoadRecipe(recipeId))
    }, [])


    return (
        <>
            {
                recipeSelector != null ? (
                    <>
                        <p>{recipeIdSelector}</p>
                        <p>{recipeNameSelector}</p>
                        <p>{recipePriceSelector}</p>
                    </>
                ) : (
                    <Empty description={<p>No se encontró la receta</p>} />
                )
            }
        </>
    )
}

export default ShowRecipe