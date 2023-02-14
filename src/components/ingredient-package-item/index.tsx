import './index.scss'

import { useState } from 'react'

import { FormInterface } from '../../interfaces/form'
import { Package } from '../../interfaces/recipe'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runChangePackagePrice } from '../../redux/reducers/packageSlice'
import Form from '../form'
import SubmitButton from '../submit-button'

const editInputs: (packageId: string) => FormInterface[] = (packageId: string): FormInterface[] => [
    {
        inputName: 'price',
        inputText: 'Precio',
        inputType: 'number',
    },
    {
        inputName: 'packageId',
        inputText: 'Envase',
        inputType: 'hidden',
        inputValue: packageId
    }
]

const IngredientPackageItem = ({ envase }: { envase: Package }) => {
    const dispatch = useAppDispatch()
    const [editPackagePrice, setEditPackagePrice] = useState(false)

    const handleEditPackage = (payload: any) => {
        dispatch(runChangePackagePrice(payload))
        setEditPackagePrice(false)
    }

    return (
        <section className="ingredient-package__item">
            <p>Cantidad: {envase.quantity} {envase.metric}</p>
            <p>Precio: $ {envase.price}</p>
            <section>
                {
                    editPackagePrice && (
                        <Form
                            inputs={editInputs(envase.id)}
                            onSubmit={handleEditPackage}
                            submitText={'Cambiar precio'}
                        />
                    )
                }
                {
                    editPackagePrice && (
                        <section>
                            <SubmitButton
                                buttonText='Cancelar'
                                className='card__delete-button'
                                onClick={() => setEditPackagePrice(false)}
                            />
                        </section>
                    )
                }
                {/* <SubmitButton
                    buttonText='Cambiar Precio'
                    className='card__edit-button'
                    onClick={() => setEditPackagePrice(true)}
                /> */}
            </section>
        </section>
    )
}

export default IngredientPackageItem