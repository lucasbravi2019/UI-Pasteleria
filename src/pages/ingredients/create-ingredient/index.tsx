import './index.scss'

import {
    useEffect,
    useState,
} from 'react'

import FormCreateIngredient from '../../../components/form-create-ingredient'
import IngredientItem from '../../../components/ingredient-item'
import MessagePopup from '../../../components/message-popup'
import SearchInput from '../../../components/search-input'
import { IngredientFieldDTO } from '../../../interfaces/ingredient'
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
    runUpdateIngredient,
} from '../../../redux/reducers/ingredientSlice'

const initialValue: (id: string) => IngredientFieldDTO = (id: string): IngredientFieldDTO => {
    return {
        id: id,
        name: ''
    }
}

const IngredientPage = () => {
    const ingredientSelector: IngredientMultiPackage[] = useAppSelector(ingredientsSelector)
    const ingredientFilterSelector: IngredientMultiPackage[] = useAppSelector(ingredientsFilterSelector)
    const [initialValues, setInitialValues] = useState<IngredientFieldDTO>(initialValue(''))
    const [isUpdating, setIsUpdating] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(runLoadIngredients())
    }, [])

    const handleSubmit = (ingredient: any) => {
        if (isUpdating) {
            dispatch(runUpdateIngredient(ingredient))
            setInitialValues(initialValue(''))
            return
        }
        dispatch(runAddIngredient(ingredient))
    }
    const handleEdit = (ingredient: any) => {
        setInitialValues(ingredient)
        setIsUpdating(true)
    }

    return (
        <section>
            <h1>Crear Ingrediente</h1>
            <FormCreateIngredient
                initialValues={initialValues}
                onSubmit={handleSubmit}
                updating={isUpdating}
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
                                handleEdit={setInitialValues}
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
                                handleEdit={handleEdit}
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