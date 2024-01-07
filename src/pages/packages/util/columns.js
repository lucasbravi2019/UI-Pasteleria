import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Tooltip } from 'antd'
import ModalCustom from '../../../components/modal-custom'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export const getFilters = (packages) => {
    const packageMap = new Map()
    Object.values(packages).forEach((pkg) =>
        packageMap.set(pkg.metric.toLowerCase(), pkg.metric)
    )
    return Array.from(packageMap.values()).map((pkg) => {
        return {
            text: pkg,
            value: pkg,
        }
    })
}
