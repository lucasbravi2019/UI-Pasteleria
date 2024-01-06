import { Form, Modal } from "antd"

const ModalForm = ({ form, title, okText, open, onOk, onCancel, inputs }) => {
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