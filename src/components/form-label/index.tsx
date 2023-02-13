import './index.scss'

import { FormInterface } from '../../interfaces/form'

const FormLabel = ({ input }: { input: FormInterface }) => {
    return (
        <label htmlFor={input.inputName} className="form__label">{input.inputText}</label>
    )
}

export default FormLabel