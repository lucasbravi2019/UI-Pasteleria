import FormInput from "../../../components/form-input"
import FormList from "../../../components/form-list"

export const render = (ingredients) => {
    return (
        <>
            <FormInput name="name" label="Receta" required tooltip="Nombre de receta" placeholder="Chocotorta" />
            <FormList name="ingredients" placeholder="Receta" options={options(ingredients)} />
        </>
    )
}

const options = (ingredients) => {
    return Object.values(ingredients).map(ingredient => {
        return {
            key: ingredient.id,
            id: ingredient.id,
            name: ingredient.name
        }
    })
}

