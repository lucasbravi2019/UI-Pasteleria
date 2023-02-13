import './index.scss'

import {
    useEffect,
    useState,
} from 'react'

import { FormInterface } from '../../interfaces/form'

const getInitialValue = (initialValue?: any) => {
    if (initialValue) {
        return initialValue
    }
    return ''
}

const FormInput = ({ input, formData, setFormData }:
    { input: FormInterface, formData: {}, setFormData: Function }) => {

    const [value, setValue] = useState(getInitialValue(input.inputValue))

    useEffect(() => {
        if (input.inputValue) {
            setValue(input.inputValue)
            setFormData({ ...formData, [input.inputName]: value })
        }
    }, [input])

    useEffect(() => {
        setFormData({ ...formData, [input.inputName]: value })
    }, [value])


    return (
        <input
            type={input.inputType}
            className="form__input"
            placeholder={input.inputText}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default FormInput