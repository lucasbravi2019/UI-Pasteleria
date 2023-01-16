import './index.scss'

const FormLabel = ({inputName, inputText}: {inputName: string, inputText: string}) => {
    return (
        <label htmlFor={inputName} className="form__label">{inputText}</label>
    )
}

export default FormLabel