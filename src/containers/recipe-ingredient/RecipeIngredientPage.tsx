import {
  useEffect,
  useState,
} from 'react'

import {
  endpoints,
  getData,
} from '../../api'
import Form from '../../components/form/Form'
import { FormInterface } from '../../interfaces/formInterface'
import {
  Ingredient,
  Recipe,
} from '../../interfaces/recipes'
import {
  ingredientsSelector,
  loadIngredients,
} from '../../reducers/ingredientSlice'
import {
  loadRecipes,
  recipesSelector,
} from '../../reducers/recipeSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../../root/hooks'

const inputs = (recetas: Recipe[], ingredientes: Ingredient[]): FormInterface[] => {
    const recipeOptions = recetas.map(receta => {
        return {
            id: receta.id,
            nombre: receta.name
        }
    })

    const ingredientOptions = ingredientes.map(ingrediente => {
        return {
            id: ingrediente.id,
            nombre: ingrediente.name
        }
    })

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
        }
    ]
}

const getAllRecipesFromApi = () => {
    return getData(endpoints.getAllRecipes)
}

const getIngredients = () => {
    return getData(endpoints.getAllIngredients)
}

const RecipeIngredientPage = () => {
    const recipeSelector: Recipe[] = useAppSelector(recipesSelector)
    const ingredientSelector: Ingredient[] = useAppSelector(ingredientsSelector)
    const dispatch = useAppDispatch()

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        getAllRecipesFromApi()
            .then(data => dispatch(loadRecipes(data)))
            .catch(err => console.log(err))

        getIngredients()
            .then(data => dispatch(loadIngredients(data)))

        setErrorMessage('')
        setSuccessMessage('')
    }, [])

    return (
        <section>
            <h1>Agregar Ingredientes a Receta</h1>
            <Form
                inputs={inputs(recipeSelector, ingredientSelector)}
                errorMessage={errorMessage}
                successMessage={successMessage}
                submitText={'Agregar ingrediente'}
                onSubmit={() => console.log('submit')}
            />
        </section>
    )
}

export default RecipeIngredientPage