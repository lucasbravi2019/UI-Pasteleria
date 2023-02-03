import { useAppDispatch } from '../../redux/hooks/hooks'
import { runRemovePackage } from '../../redux/reducers/packageSlice'
import SubmitButton from '../submit-button'

const PackageItem = ({ metric, quantity, id }: { metric: string, quantity: number, id: string }) => {
    const dispatch = useAppDispatch()

    const handleDeletePackage = (packageId: any) => dispatch(runRemovePackage(packageId))

    return (
        <section className='package__item'>
            <p>Unidad: {metric}</p>
            <p>Cantidad: {quantity}</p>
            <SubmitButton
                buttonText="Borrar Envase"
                className=""
                onClick={() => handleDeletePackage(id)}
            />
        </section>
    )
}

export default PackageItem