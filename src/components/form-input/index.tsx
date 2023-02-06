import './index.scss'

import {
    useCallback,
    useEffect,
} from 'react'

const FormInput = ({ inputType, inputText, inputName, inputVal, formData, setFormData }:
    { inputType: string, inputText: string, inputName: string, inputVal?: any, formData: {}, setFormData: Function }) => {

    const inputValue = useCallback((): string | number => {
        if ((formData as any)[inputName]) {
            return (formData as any)[inputName]
        }
        return ''
    }, [formData])

    useEffect(() => {
        if (inputVal) {
            setFormData({
                ...formData,
                [inputName]: inputVal
            })
        }
    }, [inputVal])

    return (
        <input
            type={inputType}
            className="form__input"
            placeholder={inputText}
            value={inputVal ? inputVal : inputValue()}
            onChange={(e) => setFormData({ ...formData, [inputName]: inputType === 'number' ? Number(e.target.value) : e.target.value })}
        />
    )
}

export default FormInput