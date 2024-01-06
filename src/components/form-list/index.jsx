import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Space } from 'antd'
import FormNumber from '../form-number'
import FormSearchSelect from '../form-search-select'

const FormList = ({ options, initialValue }) => {

    return (
        <>
            <Form.Item initialValue={initialValue}>
                <Form.List name="packages">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(
                                    ({ key, name }) => (
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
                                                    initialValue != null && initialValue.length > 0 ? initialValue[key][name]
                                                        : options != null
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
                                                initialValue={initialValue != null && initialValue.length > 0 ? initialValue[key][name] : 0}
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
