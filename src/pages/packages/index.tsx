import './index.scss'

import { useEffect } from 'react'

import { metrics } from '../../api/config'
import Form from '../../components/form'
import PackageItem from '../../components/package-item'
import { FormInterface } from '../../interfaces/form'
import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks/hooks'
import {
    messagesSelector,
    resetMessages,
} from '../../redux/reducers/messageSlice'
import {
    packagesSelector,
    runAddPackage,
    runLoadPackages,
} from '../../redux/reducers/packageSlice'

const inputs = (): FormInterface[] => {

    const metricOptions = metrics.map(metric => {
        return {
            id: metric,
            nombre: metric
        }
    })

    return [
        {


            inputName: 'metric',
            inputText: 'Unidad de medida',
            inputType: 'select',
            options: metricOptions
        },
        {
            inputName: 'quantity',
            inputText: 'Cantidad',
            inputType: 'number'
        }
    ]
}




const Package = () => {
    const dispatch = useAppDispatch()
    const messageSelector = useAppSelector(messagesSelector)
    const packageSelector = useAppSelector(packagesSelector)
    const handleCreatePackage = (body: any) => dispatch(runAddPackage(body))

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadPackages())
    }, [])

    return (
        <section>
            <h1>Crear Envase</h1>
            <Form
                inputs={inputs()}
                errorMessage={messageSelector.errorMessage}
                successMessage={messageSelector.successMessage}
                onSubmit={handleCreatePackage}
                submitText={'Crear Envase'}
            />
            {
                packageSelector.packages && (
                    <section className='package__container'>
                        {
                            packageSelector.packages.map(envase => (
                                <PackageItem
                                    metric={envase.metric}
                                    quantity={envase.quantity}
                                    id={envase.id}
                                    key={envase.id}
                                />
                            ))
                        }
                    </section>
                )
            }
        </section>
    )
}

export default Package