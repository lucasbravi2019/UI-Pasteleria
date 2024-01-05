import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd'
import FormNumber from '../form-number'
import FormSearchSelect from '../form-search-select'

const FormList = ({ form, fieldName, label, placeholder, options }) => {
    const filterOption = (input, option) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }

    return (
        <>
            <Form.Item>
                <Form.List name="packages">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(
                                    ({ key, name, fieldKey, ...restField }) => (
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
                                            <FormSearchSelect
                                                name={[name, 'id']}
                                                initialValue={
                                                    options != null
                                                        ? options[0]
                                                        : null
                                                }
                                                options={options}
                                            />
                                            <FormNumber
                                                name={[name, 'price']}
                                                defaultValue={0}
                                                required={true}
                                                tooltip="Precio del envase para ingrediente seleccionado"
                                                placeholder="1000"
                                            />
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
