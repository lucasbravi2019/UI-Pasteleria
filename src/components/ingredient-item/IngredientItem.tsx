import {
  deleteData,
  endpoints,
} from '../../api'
import { Ingredient } from '../../interfaces/recipes'
import { removeIngredient } from '../../reducers/ingredientSlice'
import { useAppDispatch } from '../../root/hooks'
import SubmitButton from '../submit-button/SubmitButton'

const borrarIngrediente = async (oid: string, setErrorMessage: Function, setSuccessMessage: Function, dispatch: Function) => {
    const response = await deleteData(endpoints.deleteIngredient(oid))
    if (response) {
        setSuccessMessage('Ingrediente borrado con éxito')
        dispatch()
    } else {
        setErrorMessage('Ingrediente no pudo ser borrado')
    }
}

const IngredientItem = ({ ingredient, setSuccessMessage, setErrorMessage }:
    { ingredient: Ingredient, setSuccessMessage: Function, setErrorMessage: Function }) => {
    const dispatch = useAppDispatch()

    return (
        <section>
            <p>Nombre: {ingredient.name}</p>
            <p>Cantidad: {ingredient.quantity} {ingredient.metric}</p>
            <p>Precio: $ {ingredient.price}</p>
            <SubmitButton
                buttonText='Borrar Ingrediente'
                className='recipe-card__submit-button'
                onClick={() => borrarIngrediente(ingredient.id, setErrorMessage, setSuccessMessage,
                    () => dispatch(removeIngredient(ingredient.id)))}
            />
        </section>
    )
}

export default IngredientItem