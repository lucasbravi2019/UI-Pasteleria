import { metrics } from "../../../api/config"

export const options = () => {
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