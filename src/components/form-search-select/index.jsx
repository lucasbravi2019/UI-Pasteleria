import { Form } from "antd"
import SearchSelect from "../search-select"
import { useState } from "react"

const FormSearchSelect = ({ label, name, placeholder, options, onChange, initialValue }) => {

    useState(() => {
        console.log(initialValue());
    }, [initialValue])

    return (
        <>
            <Form.Item label={label} name={name}>
                <SearchSelect initialValue={initialValue} placeholder={placeholder} options={options} onChange={onChange} name={name} />
            </Form.Item>
        </>
    )
}

export default FormSearchSelect