import { message } from 'antd'
import {
    selectContentSelector,
    selectErrorSelector,
    selectOperationSelector,
} from './selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { hideMessage } from './slice'

export const buildMessage = (content, operation, error) => {
    return {
        content,
        operation,
        error,
    }
}

const Message = (popUpMessage) => {
    const [messageApi, contextHolder] = message.useMessage()
    const content = useSelector(selectContentSelector)
    const operation = useSelector(selectOperationSelector)
    const error = useSelector(selectErrorSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (operation !== null) {
            messageApi.open({
                type: error ? 'error' : 'success',
                content,
            })
            dispatch(hideMessage())
        }
    }, [popUpMessage, operation])

    return <>{contextHolder}</>
}

export default Message
