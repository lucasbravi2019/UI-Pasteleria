import { useState } from 'react'

import Form from '../../components/form/Form'
import IngredientItem from '../../components/ingredient-item/IngredientItem'
import { Ingredient } from '../../interfaces/recipes'
import { ingredientsSelector } from '../../reducers/ingredientSlice'
import { useAppSelector } from '../../root/hooks'

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

const IngredientPage = () => {
    const selector: Ingredient[] = useAppSelector(ingredientsSelector)
    // const dispatch = useAppDispatch()
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <section>
            <h1>Crear Ingrediente</h1>
            <Form
                inputs={inputs}
                submitText={'Crear ingrediente'}
                successMessage={successMessage}
                errorMessage={errorMessage}
                onSubmit={() => console.log('ingrediente')}
            />
            {
                selector && selector.length > 0 ? selector.map((ingredient, index) =>
                    <IngredientItem
                        ingredient={ingredient}
                        key={index}
                        setSuccessMessage={setSuccessMessage}
                        setErrorMessage={setErrorMessage}
                    />
                ) : (
                    <h3>No hay ingredientes</h3>
                )
            }
        </section>
    )
}

export default IngredientPage