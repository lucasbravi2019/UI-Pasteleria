import { useEffect } from 'react'

import Form from '../../../components/form'
import { FormInterface } from '../../../interfaces/form'
import {
    IngredientMultiPackage,
    Package,
} from '../../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    ingredientsSelector,
    runAddPackageToIngredient,
    runLoadIngredients,
} from '../../../redux/reducers/ingredientSlice'
import {
    messagesSelector,
    resetMessages,
} from '../../../redux/reducers/messageSlice'
import {
    packagesSelector,
    runLoadPackages,
} from '../../../redux/reducers/packageSlice'

const inputs = (ingredients: IngredientMultiPackage[], envases: Package[]): FormInterface[] => {
    const ingredientsOptions = () => {
        return ingredients.map(ingredient => {
            return {
                id: ingredient.id,
                nombre: ingredient.name
            }
        })
    }

    const packagesOptions = () => {
        return envases.map(envase => {
            return {
                id: envase.id,
                nombre: `${envase.quantity} ${envase.metric}`
            }
        })
    }

    return [
        {
            inputName: 'ingredientId',
            inputText: 'Ingrediente',
            inputType: 'select',
            options: ingredientsOptions()
        },
        {
            inputName: 'packageId',
            inputText: 'Envase',
            inputType: 'select',
            options: packagesOptions()
        },
        {
            inputName: 'price',
            inputText: 'Precio',
            inputType: 'number'
        }
    ]
}

const AddPackageToIngredientPage = () => {
    const messageSelector = useAppSelector(messagesSelector)
    const packageSelector = useAppSelector(packagesSelector)
    const ingredientSelector = useAppSelector(ingredientsSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadIngredients())
        dispatch(runLoadPackages())
    }, [])

    const handleSubmit = (body: any) => {
        dispatch(runAddPackageToIngredient(body))
    }

    return (
        <section>
            <h1>Agregar Envase a Ingrediente</h1>
            <Form
                errorMessage={messageSelector.errorMessage}
                successMessage={messageSelector.successMessage}
                onSubmit={handleSubmit}
                submitText={'Agregar Envase'}
                inputs={inputs(ingredientSelector, packageSelector)}
            />
        </section>
    )
}

export default AddPackageToIngredientPage