import './index.scss'

import { useEffect } from 'react'

import { FormInterface } from '../../interfaces/form'

const FormInput = ({ input, formData, setFormData }:
    { input: FormInterface, formData: {}, setFormData: Function }) => {

    useEffect(() => {
        console.log(formData);

    }, [formData])

    return (
        <input
            type={input.inputType}
            className="form__input"
            placeholder={input.inputText}
            value={(formData as any)[input.inputName]}
            onChange={(e) => setFormData({ ...formData, [input.inputName]: input.inputType === 'number' ? Number(e.target.value) : e.target.value })}
        />
    )
}

export default FormInput