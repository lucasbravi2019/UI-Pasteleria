import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd'

const FormList = ({ form, fieldName, label, placeholder, options }) => {
    return (
        <>
            <Form.Item>
                <Form.List name="packages">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(
                                    (
                                        { key, name, fieldKey, ...restField },
                                        index
                                    ) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns:
                                                    '5fr 5fr 1fr',
                                                gap: '.5rem',
                                                margin: '.5rem auto',
                                            }}
                                        >
                                            <Form.Item name={[name, 'id']}>
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    options={options}
                                                    initialValue="default"
                                                    // onChange={(value) => {
                                                    //     console.log(value)
                                                    //     // form.setFieldsValue({
                                                    //     //     [`id[${index}].id`]:
                                                    //     //         value,
                                                    //     // })
                                                    // }}
                                                />
                                            </Form.Item>
                                            <Form.Item name={[name, 'price']}>
                                                <InputNumber />
                                            </Form.Item>
                                            <CloseOutlined
                                                style={{
                                                    display: 'block',
                                                    margin: 'auto',
                                                }}
                                                onClick={() => {
                                                    remove(name)
                                                }}
                                            />
                                        </Space>
                                    )
                                )}
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    + Agregar nuevo
                                </Button>
                            </div>
                        )
                    }}
                </Form.List>
            </Form.Item>
        </>
    )
}

export default FormList
