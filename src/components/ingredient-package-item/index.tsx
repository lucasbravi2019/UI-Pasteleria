import './index.scss'

import { useState } from 'react'

import { Package } from '../../interfaces/recipe'
import SubmitButton from '../submit-button'

const IngredientPackageItem = ({ envase }: { envase: Package }) => {
    const [editPackagePrice, setEditPackagePrice] = useState(false)

    return (
        <section className="ingredient-package__item">
            <p>Cantidad: {envase.quantity} {envase.metric}</p>
            <p>Precio: $ {envase.price}</p>
            <section>
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
            </section>
        </section>
    )
}

export default IngredientPackageItem