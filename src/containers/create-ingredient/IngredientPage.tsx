import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  endpoints,
  getData,
  postData,
} from '../../api'
import Form from '../../components/form/Form'
import IngredientItem from '../../components/ingredient-item/IngredientItem'
import { Ingredient } from '../../interfaces/recipes'
import {
  addIngredient,
  ingredientsSelector,
  loadIngredients,
} from '../../reducers/ingredientSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../../root/hooks'
import { resetMessages } from '../create-recipe/RecipePage'

const inputs = [
    {
        inputName: 'name',
        inputText: 'Nombre de ingrediente',
        inputType: 'text'
    },
    {
        inputName: 'metric',
        inputText: 'Unidad de medida',
        inputType: 'text'
    },
    {
        inputName: 'price',
        inputText: 'Precio',
        inputType: 'number'
    },
    {
        inputName: 'quantity',
        inputText: 'Cantidad',
        inputType: 'number'
    }
]

const getIngredients = () => {
    return getData(endpoints.getAllIngredients)
}

const createIngredient = async (body: {}, setSuccessMessage: Function, setErrorMessage: Function, reducer: Function) => {
    resetMessages(setSuccessMessage, setErrorMessage)
    const response = await postData(endpoints.createIngredient, body)
    if (response.hasOwnProperty('error')) {
        setErrorMessage('No pudo crearse el ingrediente')
    } else {
        setSuccessMessage('El ingrediente fue creado satisfactoriamente')
        reducer(response)
    }
}

const IngredientPage = () => {
    const selector: Ingredient[] = useAppSelector(ingredientsSelector)
    const dispatch = useAppDispatch()
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const crearIngrediente = useCallback((ingredient: Ingredient) => {
        ingredient = {
            ...ingredient,
            price: Number(ingredient.price)
        }

<<<<<<< HEAD
        createIngredient(ingredient, setSuccessMessage, setErrorMessage, (id: string) => dispatch(addIngredient({ ...ingredient, id: id })))
=======
        createIngredient(ingredient, setSuccessMessage, setErrorMessage, () => dispatch(addIngredient(ingredient)))
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50
    }, [])

    useEffect(() => {
        getIngredients()
<<<<<<< HEAD
            .then(data => dispatch(loadIngredients(data)))
    }, [])

=======
            .then(data => {
                console.log(data);
                dispatch(loadIngredients(data))
            })
    }, [])

    useEffect(() => {
        console.log(selector);
    }, [selector])

>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50
    return (
        <section>
            <h1>Crear Ingrediente</h1>
            <Form
                inputs={inputs}
                submitText={'Crear ingrediente'}
                successMessage={successMessage}
                errorMessage={errorMessage}
                onSubmit={crearIngrediente}
            />
            {
                selector && selector.length > 0 ? selector.map((ingredient, index) =>
                    <IngredientItem
                        ingredient={ingredient}
                        key={index}
<<<<<<< HEAD
                        setSuccessMessage={setSuccessMessage}
                        setErrorMessage={setErrorMessage}
=======
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50
                    />
                ) : (
                    <h3>No hay ingredientes</h3>
                )
            }
        </section>
    )
}

export default IngredientPage