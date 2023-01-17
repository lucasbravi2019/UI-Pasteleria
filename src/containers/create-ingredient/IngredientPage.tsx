import { useCallback, useEffect, useState } from "react"
import { endpoints, getData, postData } from "../../api"
import Form from "../../components/form/Form"
import { useAppDispatch, useAppSelector } from "../../root/hooks"
import { resetMessages } from "../create-recipe/RecipePage"
import { addIngredient, ingredientsSelector, loadIngredients } from "../../reducers/ingredientSlice"
import { Ingredient } from "../../interfaces/recipes"
import IngredientItem from "../../components/ingredient-item/IngredientItem"

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
    }
]

const getIngredients = () => {
    return getData(endpoints.getAllIngredients)
}

const createIngredient = async (body: {}, setSuccessMessage: Function, setErrorMessage: Function, reducer: Function) => {
    resetMessages(setSuccessMessage, setErrorMessage)
    const response = await postData(endpoints.createIngredient, body)
    if (response) {
        setSuccessMessage('El ingrediente fue creado satisfactoriamente')
        reducer()
    } else setErrorMessage('No pudo crearse el ingrediente')

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

        createIngredient(ingredient, setSuccessMessage, setErrorMessage, () => dispatch(addIngredient(ingredient)))
    }, [])

    useEffect(() => {
        getIngredients()
            .then(data => {
                console.log(data);
                dispatch(loadIngredients(data))
            })
    }, [])

    useEffect(() => {
        console.log(selector);
    }, [selector])

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
                    />
                ) : (
                    <h3>No hay ingredientes</h3>
                )
            }
        </section>
    )
}

export default IngredientPage