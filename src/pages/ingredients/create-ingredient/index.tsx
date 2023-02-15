import './index.scss'

import { useEffect } from 'react'

import FormCreateIngredient from '../../../components/form-create-ingredient'
import IngredientItem from '../../../components/ingredient-item'
import MessagePopup from '../../../components/message-popup'
import SearchInput from '../../../components/search-input'
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

const IngredientPage = () => {
    const ingredientSelector: IngredientMultiPackage[] = useAppSelector(ingredientsSelector)
    const ingredientFilterSelector: IngredientMultiPackage[] = useAppSelector(ingredientsFilterSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(runLoadIngredients())
    }, [])

    const handleSubmit = (ingredientName: any) => dispatch(runAddIngredient(ingredientName))

    return (
        <section>
            <h1>Crear Ingrediente</h1>
            <FormCreateIngredient
                initialValues={{ name: '' }}
                onSubmit={handleSubmit}
            />
            <SearchInput
                dispatch={(name: string) => dispatch(filterIngredients(name))}
            />
            {
                ingredientSelector.length === 0 && (
                    <h3>No hay ingredientes</h3>
                )
            }
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
                <MessagePopup />
            </section>
        </section>
    )
}

export default IngredientPage