import './index.scss'

import { useCallback } from 'react'

const FormInput = ({ inputType, inputText, inputName, formData, setFormData }:
    { inputType: string, inputText: string, inputName: string, formData: {}, setFormData: Function }) => {

    const inputValue = useCallback((): string | number => {
        if ((formData as any)[inputName]) {
            return (formData as any)[inputName]
        }
        return ''
    }, [formData])

    return (
        <input
            type={inputType}
            className="form__input"
            placeholder={inputText}
            value={inputValue()}
            onChange={(e) => setFormData({ ...formData, [inputName]: inputType === 'number' ? Number(e.target.value) : e.target.value })}
        />
    )
}

export default FormInput