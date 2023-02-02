import './index.scss'

import { useEffect } from 'react'

import { metrics } from '../../api/config'
import Form from '../../components/form'
import IngredientItem from '../../components/ingredient-item'
import { FormInterface } from '../../interfaces/form'
import { Messages } from '../../interfaces/message'
import { Ingredient } from '../../interfaces/recipe'
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/hooks/hooks'
import {
  ingredientsSelector,
  runAddIngredient,
  runLoadIngredients,
} from '../../redux/reducers/ingredientSlice'
import { messagesSelector } from '../../redux/reducers/messageSlice'

const inputs = (): FormInterface[] => {
    const metricOptions = metrics.map(metric => {
        return {
            id: metric, nombre: metric
        }
    })

    return [
        {
            inputName: 'name',
            inputText: 'Nombre de ingrediente',
            inputType: 'text'
        },
        {
            inputName: 'metric',
            inputText: 'Unidad de medida',
            inputType: 'select',
            options: metricOptions
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
}
const IngredientPage = () => {
    const ingredientSelector: Ingredient[] = useAppSelector(ingredientsSelector)
    const messageSelector: Messages = useAppSelector(messagesSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(runLoadIngredients())
    }, [])

    const handleIngredientCreation = (body: any) => dispatch(runAddIngredient(body))

    return (
        <section>
            <h1>Crear Ingrediente</h1>
            <Form
                inputs={inputs()}
                submitText={'Crear ingrediente'}
                successMessage={messageSelector.successMessage}
                errorMessage={messageSelector.errorMessage}
                onSubmit={handleIngredientCreation}
            />
            <section className='ingredient__container'>
                {
                    ingredientSelector && ingredientSelector.length > 0 ? ingredientSelector.map((ingredient, index) =>
                        <IngredientItem
                            ingredient={ingredient}
                            key={index}
                        />
                    ) : (
                        <h3>No hay ingredientes</h3>
                    )
                }
            </section>
        </section>
    )
}

export default IngredientPage