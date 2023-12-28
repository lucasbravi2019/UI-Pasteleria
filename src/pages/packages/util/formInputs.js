import { metrics } from "../../../api/config"
import FormInput from "../../../components/form-input"
import FormNumber from "../../../components/form-number"
import FormSearchSelect from "../../../components/form-search-select"

const options = () => {
    const defaultValue = {
        label: '--Seleccionar--',
        value: 'default',
        disabled: true,
    }
    const otherOptions = metrics.map(metric => {
        return {
            label: metric,
            value: metric
        }
    })

    return [defaultValue, ...otherOptions]
}

export const render = (setFieldValue) => {
    return (
        <>
            <FormSearchSelect
                label="Medida"
                name="metric"
                placeholder="g"
                required
                tooltip="Dimensión usada"
                options={options()}
                onChange={setFieldValue} />
            <FormNumber label="Cantidad" name="quantity" placeholder="150" required tooltip="Cantidad que tiene el envase" />
        </>
    )
}