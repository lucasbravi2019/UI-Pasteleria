import { Form, Modal } from "antd"
import { useEffect } from "react"

const ModalForm = ({ form, title, initialValues, okText, open, onOk, onCancel, render }) => {
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
                    .catch(error => console.log(error))
            }}
        >
            <Form
                form={form}
                initialValues={initialValues}
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
            >{render(initialValues)}</Form>
        </Modal>
    )
}

export default ModalForm