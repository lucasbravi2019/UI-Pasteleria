import './index.scss'

const SubmitButton = ({onClick, buttonText, className}: {onClick: Function, buttonText: string, className: string}) => {
    return (
        <button 
            onClick={() => onClick}
            className={className}    
        >{buttonText}</button>
    )
}

export default SubmitButton