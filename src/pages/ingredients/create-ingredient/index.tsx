import './index.scss'

import { useEffect } from 'react'

import Form from '../../../components/form'
import IngredientItem from '../../../components/ingredient-item'
import SearchInput from '../../../components/search-input'
import { FormInterface } from '../../../interfaces/form'
import { IngredientMultiPackage } from '../../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    filterIngredients,
    ingredientsFilterSelector,
    ingredientsSelector,
    runAddIngredient,
    runLoadIngredients,
} from '../../../redux/reducers/ingredientSlice'

const inputs: FormInterface[] = [{
    inputName: 'name',
    inputText: 'Nombre de ingrediente',
    inputType: 'text'
}]

const IngredientPage = () => {
    const ingredientSelector: IngredientMultiPackage[] = useAppSelector(ingredientsSelector)
    const ingredientFilterSelector: IngredientMultiPackage[] = useAppSelector(ingredientsFilterSelector)
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
                onSubmit={handleIngredientCreation}
            />
            <SearchInput
                dispatch={(name: string) => dispatch(filterIngredients(name))}
            />
            <section className='ingredient__container'>
                {
                    ingredientFilterSelector && ingredientFilterSelector.length > 0 && ingredientFilterSelector.map(ingredient =>
                        <section key={ingredient.id}>
                            <IngredientItem
                                ingredient={ingredient}
                            />
                        </section>
                    )
                }
                {
                    ingredientSelector && ingredientFilterSelector.length === 0 && ingredientSelector.length > 0
                    && ingredientSelector.map(ingredient =>
                        <section key={ingredient.id}>
                            <IngredientItem
                                ingredient={ingredient}
                            />
                        </section>
                    )
                }
                {
                    ingredientSelector.length === 0 && (
                        <h3>No hay ingredientes</h3>
                    )
                }
            </section>
        </section>
    )
}

export default IngredientPage