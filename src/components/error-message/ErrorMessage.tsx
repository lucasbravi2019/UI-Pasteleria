import './index.scss'

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <p className="error-message">{message}</p>
    )
}

export default ErrorMessage