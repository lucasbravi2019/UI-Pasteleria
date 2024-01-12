import { Form, Modal } from "antd"
import { showMessage } from "../message/slice"
import Message, { buildMessage } from "../message"
import { useDispatch, useSelector } from "react-redux"
import { selectMessageSelector } from "../message/selectors"

const ModalForm = ({ form, title, okText, open, onOk, onCancel, inputs }) => {
    const dispatch = useDispatch()

    const message = useSelector(selectMessageSelector)
    const showErrorMessage = () => {
        dispatch(showMessage(buildMessage('Por favor revisar valores ingresados', 'ANY', true)))
    }

    return (
        <Modal
            open={open}
            title={title}
            okText={okText}
            cancelText='Cancelar'
            onCancel={() => {
                onCancel()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields()
                        onOk(values)
                    })
                    .catch(_ => showErrorMessage())
            }}
        >
            <Message message={message} />
            <Form
                form={form}
                labelCol={{
                    span: 18
                }}
                layout='vertical'
                size='small'
                wrapperCol={{
                    span: 18
                }}
                style={{
                    width: 600
                }}
            >{inputs}</Form>
        </Modal>
    )
}

export default ModalForm