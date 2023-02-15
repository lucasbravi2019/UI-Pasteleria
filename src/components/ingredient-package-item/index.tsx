import './index.scss'

import { useState } from 'react'

import { IngredientPriceDTO } from '../../interfaces/ingredient'
import { Package } from '../../interfaces/recipe'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runChangePackagePrice } from '../../redux/reducers/packageSlice'
import FormChangeIngredientPrice from '../form-change-ingredient-price'
import SubmitButton from '../submit-button'

const initialValues: (id: string) => IngredientPriceDTO = (id: string): IngredientPriceDTO => {
    return {
        packageId: id,
        price: 0
    }
}

const IngredientPackageItem = ({ envase }: { envase: Package }) => {
    const [editPackagePrice, setEditPackagePrice] = useState(false)
    const dispatch = useAppDispatch()

    const handleSubmit = (body: any) => {
        dispatch(runChangePackagePrice(body))
        setEditPackagePrice(false)
    }

    return (
        <section className="ingredient-package__item">
            <p>Cantidad: {envase.quantity} {envase.metric}</p>
            <p>Precio: $ {envase.price}</p>
            <section>
                {
                    editPackagePrice && (
                        <section>
                            <FormChangeIngredientPrice
                                initialValues={initialValues(envase.id)}
                                onSubmit={handleSubmit}
                            />
                            <SubmitButton
                                buttonText='Cancelar'
                                className='card__delete-button'
                                onClick={() => setEditPackagePrice(false)}
                            />
                        </section>
                    )
                }
            </section>
            <SubmitButton
                buttonText='Editar precio'
                className='card__edit-button'
                onClick={() => setEditPackagePrice(true)}
            />
        </section >
    )
}

export default IngredientPackageItem