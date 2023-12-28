import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Tooltip } from "antd"
import { Link } from 'react-router-dom'
import ModalCustom from "../../../components/modal-custom"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"

export const columns = (packages) => {
    return [
        {
            title: "Dimensión",
            dataIndex: "metric",
            key: "metric",
            width: 200,
            filters: getFilters(packages),
            sorter: (a, b) => a.metric.localeCompare(b.metric),
            onFilter: (value, record) => record.metric === value,
        },
        {
            title: "Cantidad",
            dataIndex: "quantity",
            key: "quantity",
            width: 200
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            width: 200,
            render: (_, record) => {
                return (
                    <div className="grid-3-lg">
                        <Tooltip title='Editar Envase'>
                            <Link to={`recetas/editar/${record.recipeId}`}
                                className='link__icon'
                            ><FontAwesomeIcon icon={faPenToSquare} /></Link>
                        </Tooltip>
                        <Tooltip title='Borrar Envase'>
                            <Button type="primary" danger
                                onClick={() => record.onOpenModal()}
                            ><FontAwesomeIcon icon={faTrash} /></Button>
                        </Tooltip>
                        <ModalCustom text="Borrar Envase?" onOk={() => record.onDelete()} />
                    </div>
                )
            }
        }
    ]
}

const getFilters = (packages) => {
    const packageMap = new Map()
    Object.values(packages).forEach(pkg => packageMap.set(pkg.metric, pkg.metric))
    return Array.from(packageMap.values()).map(pkg => {
        return {
            text: pkg,
            value: pkg
        }
    })
}

export const getData = (data) => {
    return data.packages.map(pkg => {
        return {
            ...pkg,
            key: pkg.id,
            onDelete: () => data.onDelete(pkg.id),
            onOpenModal: () => data.onOpenModal()
        }
    })
}
