export const columns = [
    {
        title: 'Ingrediente',
        key: 'name',
        dataIndex: 'name',
        width: 200
    },
    {
        title: 'Cantidad Usada',
        key: 'quantity',
        dataIndex: 'quantity',
        width: 200,
        render: (_, record) => <span>{record.quantity} {record.package.metric}</span>
    },
    {
        title: 'Precio',
        key: 'price',
        dataIndex: 'price',
        width: 200,
        render: (_, record) => <span>$ {record.package.price}</span>
    },
    {
        title: 'Envase',
        key: 'package',
        dataIndex: 'package',
        width: 200,
        render: (_, record) => <span>{record.package.quantity} {record.package.metric}</span>
    },
]

export const getData = (ingredients) => {
    return ingredients.map(ingredient => {
        return {
            ...ingredient,
            key: ingredient.id
        }
    })
}