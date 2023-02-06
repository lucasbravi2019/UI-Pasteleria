import './index.scss'

import { IngredientPackage } from '../../interfaces/recipe'

const IngredientPackageItem = ({ envase }: { envase: IngredientPackage }) => {
    return (
        <section className="ingredient-package__item">
            <p>Cantidad: {envase.package.quantity} {envase.package.metric}</p>
            <p>Precio: $ {envase.price}</p>
        </section>
    )
}

export default IngredientPackageItem