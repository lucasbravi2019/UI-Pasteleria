import './index.scss'

const FormInput = ({inputType, inputText}: {inputType: string, inputText: string}) => {
    return (
        <input 
            type={inputType} 
            className="form__input" 
            placeholder={inputText}
        />
    )
}

export default FormInput