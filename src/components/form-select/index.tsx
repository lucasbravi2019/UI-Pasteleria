import {
    useEffect,
    useState,
} from 'react'

import { FormInterface } from '../../interfaces/form'

const FormSelect = ({ input, formData, setFormData }: { input: FormInterface, formData: {}, setFormData: Function }) => {
    const [selected, setSelected] = useState<any>({})

    useEffect(() => {
        if (Object.keys(selected).length !== 0) {
            setFormData({ ...formData, ...selected })
        }
    }, [selected])

    return (
        <select
            name={input.inputName}
            title={input.inputText}
            className="form__select"
            value={selected[input.inputName] ? selected[input.inputName] : ''}
            onChange={(e) => setSelected({ ...selected, [input.inputName]: e.target.value })}
        >
            <option value="" disabled>-- Seleccionar una opcion --</option>
            {
                input.options && typeof input.options === 'function' && input.options(formData).map((option: string) => (
                    <option
                        value={option}
                        key={option}
                    >{option}
                    </option>
                ))
            }
            {
                input.options && typeof input.options !== 'function' && input.options.map((option, ind) => (
                    <option
                        key={ind}
                        value={option.id}
                    >{option.nombre}</option>
                ))
            }
        </select>
    )
}

export default FormSelect