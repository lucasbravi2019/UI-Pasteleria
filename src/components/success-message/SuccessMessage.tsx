import './index.scss'

const SuccessMessage = ({ message }: { message: string }) => {
    return (
        <>
            {
                message && (
                    <p
                        className="success-message"
                        id="success-message"
                    >{message}</p>
                )}
        </>
    )
}

export default SuccessMessage