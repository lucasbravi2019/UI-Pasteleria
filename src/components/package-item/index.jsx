import './index.scss'

import { useAppDispatch } from '../../redux/store/store'
import { runRemovePackage } from '../../redux/reducers/packageSlice'
import SubmitButton from '../submit-button'

const PackageItem = ({ metric, quantity, id }) => {
    const dispatch = useAppDispatch()
    const handleDeletePackage = (packageId) => dispatch(runRemovePackage(packageId))

    return (
        <section className='package__item'>
            <p>Cantidad: {quantity}</p>
            <p>Unidad: {metric}</p>
            <SubmitButton
                buttonText="Borrar Envase"
                className="card__delete-button"
                onClick={() => handleDeletePackage(id)}
            />
        </section>
    )
}

export default PackageItem