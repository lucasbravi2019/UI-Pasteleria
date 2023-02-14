import './index.scss'

import { useEffect } from 'react'

import FormCreatePackage from '../../components/form-create-package'
import PackageItem from '../../components/package-item'
import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks/hooks'
import { resetMessages } from '../../redux/reducers/messageSlice'
import {
    packagesSelector,
    runAddPackage,
    runLoadPackages,
} from '../../redux/reducers/packageSlice'

const Package = () => {
    const dispatch = useAppDispatch()
    const packageSelector = useAppSelector(packagesSelector)

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadPackages())
    }, [])

    const handleCreatePackage = (envase: any) => dispatch(runAddPackage(envase))

    return (
        <section>
            <h1>Crear Envase</h1>
            <FormCreatePackage
                initialValues={{ metric: '', quantity: 0 }}
                onSubmit={handleCreatePackage}
            />
            {
                packageSelector && (
                    <section className='package__container'>
                        {
                            packageSelector.map(envase => (
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