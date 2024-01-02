import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import FormNumber from '../form-number'
import FormSearchSelect from '../form-search-select'

const FormList = ({ name, label, placeholder, options }) => {
    return (
        <>
            <Form.Item>
                <Form.List name={name}>
                    {(subFields, subOpts) => (
                        <div>
                            {subFields.map((subField) => (
                                <Space key={subField.key}>
                                    <FormSearchSelect
                                        placeholder={placeholder}
                                        name={[subField.name, 'package']}
                                        options={options}
                                        initialValue={() =>
                                            console.log('Initial Value')
                                        }
                                        label="Envase"
                                    />
                                    <FormNumber
                                        label={label}
                                        name={[subField.name, 'price']}
                                        placeholder={placeholder}
                                        required
                                        defaultValue={0}
                                    />
                                    <CloseOutlined
                                        onClick={() => {
                                            subOpts.remove(subField.name)
                                        }}
                                    />
                                </Space>
                            ))}
                            <Button
                                type="dashed"
                                onClick={() => subOpts.add()}
                                block
                            >
                                + Agregar nuevo
                            </Button>
                        </div>
                    )}
                </Form.List>
            </Form.Item>
        </>
    )
}

export default FormList
