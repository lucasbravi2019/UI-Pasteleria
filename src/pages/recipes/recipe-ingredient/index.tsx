import { useEffect } from 'react'

import Form from '../../../components/form'
import { FormInterface } from '../../../interfaces/form'
import { Messages } from '../../../interfaces/message'
import {
  IngredientMultiPackage,
  Recipe,
} from '../../../interfaces/recipe'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/hooks/hooks'
import {
  ingredientsSelector,
  runLoadIngredients,
} from '../../../redux/reducers/ingredientSlice'
import { messagesSelector } from '../../../redux/reducers/messageSlice'
import {
  runAddIngredientToRecipe,
} from '../../../redux/reducers/recipeIngredientSlice'
import {
  recipesSelector,
  runLoadRecipes,
} from '../../../redux/reducers/recipeSlice'

const inputs = (recetas: Recipe[], ingredientes: IngredientMultiPackage[]): FormInterface[] => {
    let recipeOptions

    useEffect(() => {
        console.log(recetas)
        console.log(ingredientes)
    }, [recetas, ingredientes])
    if (recetas) {
        recipeOptions = recetas.map(receta => {
            return {
                id: receta.id,
                nombre: receta.name
            }
        })
    }

    let ingredientOptions: any

    if (ingredientes) {
        ingredientOptions = ingredientes.map(ingrediente => {
            return {
                id: ingrediente.id,
                nombre: ingrediente.name
            }
        })
    }

    const metricOptions = (selected: any) => {
        if (selected && selected.ingredientId) {
            const ingredient = ingredientes.filter(ingrediente => ingrediente.id === selected.ingredientId)
            if (ingredient.length > 0) {
                return ingredient[0].package.map(envase => `${envase.quantity} ${envase.metric}`)
            }
        }
        return []
    }

    return [
        {
            inputText: 'Receta',
            inputName: 'recipeId',
            inputType: 'select',
            options: recipeOptions
        },
        {
            inputText: 'Ingrediente',
            inputName: 'ingredientId',
            inputType: 'select',
            options: ingredientOptions
        },
        {
            inputText: 'Envase',
            inputName: 'metric',
            inputType: 'select',
            options: metricOptions
        },
        {
            inputText: 'Cantidad',
            inputName: 'quantity',
            inputType: 'number'
        }
    ]
}

const RecipeIngredientPage = () => {
    const recipeSelector: Recipe[] = useAppSelector(recipesSelector)
    const ingredientSelector: IngredientMultiPackage[] = useAppSelector(ingredientsSelector)
    const messageSelector: Messages = useAppSelector(messagesSelector)
    const dispatch = useAppDispatch()

    const handleSubmit = (payload: any) => dispatch(runAddIngredientToRecipe(payload))

    useEffect(() => {
        dispatch(runLoadRecipes())
        dispatch(runLoadIngredients())
    }, [])

    return (
        <section>
            <h1>Agregar Ingredientes a Receta</h1>
            <Form
                inputs={inputs(recipeSelector, ingredientSelector)}
                errorMessage={messageSelector.errorMessage}
                successMessage={messageSelector.successMessage}
                submitText={'Agregar ingrediente'}
                onSubmit={handleSubmit}
            />
        </section>
    )
}

export default RecipeIngredientPage