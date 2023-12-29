import { message } from "antd"
import { selectContentSelector, selectErrorSelector, selectOperationSelector } from "./selectors"
import { useSelector } from 'react-redux'
import { useEffect } from "react"

const Message = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const content = useSelector(selectContentSelector)
    const operation = useSelector(selectOperationSelector)
    const error = useSelector(selectErrorSelector)

    useEffect(() => {
        console.log(operation);
        if (operation !== null) {
            messageApi.open({
                type: error ? 'error' : 'success',
                content
            })
        }
    }, [operation, content, error])

    return (
        <>
            {contextHolder}
        </>
    )
}

export default Message