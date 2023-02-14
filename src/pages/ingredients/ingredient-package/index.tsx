import { useEffect } from 'react'

import FormIngredientPackage from '../../../components/form-ingredient-package'
import MessagePopup from '../../../components/message-popup'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    ingredientsSelector,
    runAddPackageToIngredient,
    runLoadIngredients,
} from '../../../redux/reducers/ingredientSlice'
import { resetMessages } from '../../../redux/reducers/messageSlice'
import {
    packagesSelector,
    runLoadPackages,
} from '../../../redux/reducers/packageSlice'

const AddPackageToIngredientPage = () => {
    const dispatch = useAppDispatch()
    const packageSelector = useAppSelector(packagesSelector)
    const ingredientSelector = useAppSelector(ingredientsSelector)

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadIngredients())
        dispatch(runLoadPackages())
    }, [])

    const handleSubmit = (body: any) => dispatch(runAddPackageToIngredient(body))

    return (
        <section>
            <h1>Agregar Envase a Ingrediente</h1>
            <FormIngredientPackage
                envases={packageSelector.map(envase => {
                    return { id: envase.id, name: `${envase.quantity} ${envase.metric}` }
                })}
                ingredientes={ingredientSelector.map(ingredient => {
                    return { id: ingredient.id, name: ingredient.name }
                })}
                initialValues={{ ingredientId: '', packageId: '', price: 0 }}
                onSubmit={handleSubmit}
            />
            <MessagePopup />
        </section>
    )
}

export default AddPackageToIngredientPage