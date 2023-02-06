import './index.scss'

import { useEffect } from 'react'

import Form from '../../../components/form'
import IngredientItem from '../../../components/ingredient-item'
import { FormInterface } from '../../../interfaces/form'
import { Messages } from '../../../interfaces/message'
import { IngredientMultiPackage } from '../../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    ingredientsSelector,
    runAddIngredient,
    runLoadIngredients,
} from '../../../redux/reducers/ingredientSlice'
import { messagesSelector } from '../../../redux/reducers/messageSlice'

const inputs: FormInterface[] = [{
    inputName: 'name',
    inputText: 'Nombre de ingrediente',
    inputType: 'text'
}]

const IngredientPage = () => {
    const ingredientSelector: IngredientMultiPackage[] = useAppSelector(ingredientsSelector)
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
                inputs={inputs}
                submitText={'Crear ingrediente'}
                successMessage={messageSelector.successMessage}
                errorMessage={messageSelector.errorMessage}
                onSubmit={handleIngredientCreation}
            />
            <section className='ingredient__container'>
                {
                    ingredientSelector && ingredientSelector.length > 0 ? ingredientSelector.map(ingredient =>
                        <section key={ingredient.id}>
                            <IngredientItem
                                ingredient={ingredient}
                            />
                        </section>
                    ) : (
                        <h3>No hay ingredientes</h3>
                    )
                }
            </section>
        </section>
    )
}

export default IngredientPage