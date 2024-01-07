import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, InputNumber, Space } from 'antd'
import FormNumber from '../form-number'
import FormSearchSelect from '../form-search-select'

const FormList = ({ options, initialValue, names, name, titles }) => {
    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    textAlign: 'center',
                    margin: '.5rem auto',
                }}
            >
                {titles.map((title, index) => (
                    <span key={index}>{title}</span>
                ))}
            </div>
            <Form.Item initialValue={initialValue}>
                <Form.List name={name}>
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map(({ key, name }) => (
                                    <div key={key}>
                                        {names.length === 3 && (
                                            <Form.Item
                                                initialValue={
                                                    initialValue != null &&
                                                    initialValue[key] != null &&
                                                    initialValue[key][
                                                        names[2]
                                                    ] != null
                                                        ? initialValue[key][
                                                              names[2]
                                                          ]
                                                        : 0
                                                }
                                                style={{
                                                    display: 'none',
                                                }}
                                            />
                                        )}
                                        <Space
                                            key={key}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns:
                                                    '5fr 5fr 1fr',
                                                margin: '.5rem auto',
                                                gap: '.5rem',
                                            }}
                                        >
                                            <FormSearchSelect
                                                name={[name, names[0]]}
                                                initialValue={
                                                    initialValue != null &&
                                                    initialValue.length > 0
                                                        ? initialValue[key][
                                                              name
                                                          ]
                                                        : options != null
                                                        ? options[0]
                                                        : null
                                                }
                                                options={options}
                                            />
                                            <FormNumber
                                                name={[name, names[1]]}
                                                defaultValue={0}
                                                required={true}
                                                tooltip="Precio del envase para ingrediente seleccionado"
                                                placeholder="1000"
                                                initialValue={
                                                    initialValue != null &&
                                                    initialValue.length > 0
                                                        ? initialValue[key][
                                                              name
                                                          ]
                                                        : 0
                                                }
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
                                    </div>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    + Agregar nuevo
                                </Button>
                            </>
                        )
                    }}
                </Form.List>
            </Form.Item>
        </>
    )
}

export default FormList
