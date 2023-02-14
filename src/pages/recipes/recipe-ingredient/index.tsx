import { useEffect } from 'react'

import FormRecipeIngredient from '../../../components/form-recipe-ingredient'
import MessagePopup from '../../../components/message-popup'
import { IngredientMultiPackage } from '../../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    ingredientsSelector,
    runLoadIngredients,
} from '../../../redux/reducers/ingredientSlice'
import {
    runAddIngredientToRecipe,
} from '../../../redux/reducers/recipeIngredientSlice'
import {
    recipesSelector,
    runLoadRecipes,
} from '../../../redux/reducers/recipeSlice'

const getPackageByIngredientId = (ingredientId: string, ingredients: IngredientMultiPackage[]) => {
    const ingredient = ingredients.filter(ingrediente => ingrediente.id === ingredientId)
    if (ingredient.length > 0 && ingredient[0].packages) {
        return ingredient[0].packages.map(envase => {
            return {
                id: `${envase.quantity} ${envase.metric}`,
                name: `${envase.quantity} ${envase.metric}`
            }
        })
    }
    return []
}

const RecipeIngredientPage = () => {
    const dispatch = useAppDispatch()
    const ingredientSelector = useAppSelector(ingredientsSelector)
    const recipeSelector = useAppSelector(recipesSelector)

    const handleSubmit = (body: any) => dispatch(runAddIngredientToRecipe(body))

    useEffect(() => {
        dispatch(runLoadRecipes())
        dispatch(runLoadIngredients())
    }, [])

    return (
        <section>
            <h1>Agregar Ingredientes a Receta</h1>
            <FormRecipeIngredient
                ingredientes={ingredientSelector}
                initialValues={{ ingredientId: '', metric: '', quantity: 0, recipeId: '' }}
                onSubmit={handleSubmit}
                recetas={recipeSelector}
                packageSelector={getPackageByIngredientId}
            />
            <MessagePopup />
        </section>
    )
}

export default RecipeIngredientPage