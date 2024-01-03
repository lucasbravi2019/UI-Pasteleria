import FormInput from "../../../components/form-input"
import FormList from "../../../components/form-list"

export const render = (packages, form) => {
    return (
        <>
            <FormInput label="Ingrediente" name="name" placeholder="Dulce de leche" required tooltip="Nombre del ingrediente" />
            <FormList fieldName="packages" placeholder="Envase" options={options(packages)} form={form} />
        </>
    )
}

const options = (packages) => {
    return Object.values(packages).map(pkg => {
        return {
            label: pkg.metric,
            value: pkg.id
        }
    })
}