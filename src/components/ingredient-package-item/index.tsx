import './index.scss'

import { useState } from 'react'

import { FormInterface } from '../../interfaces/form'
import { IngredientPackage } from '../../interfaces/recipe'
import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks/hooks'
import { messagesSelector } from '../../redux/reducers/messageSlice'
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

const IngredientPackageItem = ({ envase }: { envase: IngredientPackage }) => {
    const dispatch = useAppDispatch()
    const messageSelector = useAppSelector(messagesSelector)
    const [editPackagePrice, setEditPackagePrice] = useState(false)

    const handleEditPackage = (payload: any) => {
        dispatch(runChangePackagePrice(payload))
        setEditPackagePrice(false)
    }

    return (
        <section className="ingredient-package__item">
            <p>Cantidad: {envase.package.quantity} {envase.package.metric}</p>
            <p>Precio: $ {envase.price}</p>
            <section>
                {
                    editPackagePrice && (
                        <Form
                            errorMessage={messageSelector.errorMessage}
                            successMessage={messageSelector.successMessage}
                            inputs={editInputs(envase.package.id)}
                            onSubmit={handleEditPackage}
                            submitText={'Cambiar precio'}
                        />
                    )
                }
                {
                    editPackagePrice && (
                        <SubmitButton
                            buttonText='Cancelar'
                            className='card__delete-button'
                            onClick={() => setEditPackagePrice(false)}
                        />
                    )
                }
                <SubmitButton
                    buttonText='Cambiar Precio'
                    className='card__edit-button'
                    onClick={() => setEditPackagePrice(true)}
                />
            </section>
        </section>
    )
}

export default IngredientPackageItem