export const columns = [
    {
        title: 'Ingrediente',
        key: 'name',
        dataIndex: 'name',
        width: 200,
        render: (_, record) => <span>{record.ingredient.ingredient.name}</span>,
    },
    {
        title: 'Cantidad Usada',
        key: 'quantity',
        dataIndex: 'quantity',
        width: 200,
        render: (_, record) => (
            <span>
                {record.quantity} {record.ingredient.package.metric}
            </span>
        ),
    },
    {
        title: 'Precio',
        key: 'price',
        dataIndex: 'price',
        width: 200,
        render: (_, record) => <span>$ {record.price.toFixed(2)}</span>,
    },
    {
        title: 'Envase',
        key: 'package',
        dataIndex: 'package',
        width: 200,
        render: (_, record) => (
            <span>
                {record.ingredient.package.quantity}{' '}
                {record.ingredient.package.metric} / $ {record.ingredient.price}
            </span>
        ),
    },
]

export const getData = (ingredients) => {
    return ingredients.map((ingredient) => {
        return {
            ...ingredient,
            key: ingredient.id,
        }
    })
}
