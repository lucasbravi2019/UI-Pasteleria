export const options = (packages) => {
    const defaultOption = {
        label: "--Seleccionar--",
        value: 'default',
        disabled: true
    }
    const packagesOptions = Object.values(packages).map(pkg => {
        return {
            label: `${pkg.quantity} ${pkg.metric}`,
            value: pkg.id
        }
    })

    return [defaultOption, ...packagesOptions]
}