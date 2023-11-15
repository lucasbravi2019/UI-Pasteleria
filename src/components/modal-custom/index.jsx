import { Modal } from 'antd/lib'
import { useSelector, useDispatch } from 'react-redux'
import { selectModalOpenSelector } from '../../pages/recipes/selectors'
import { closeModal } from '../../pages/recipes/slice'
import { useEffect, useState } from 'react'

const ModalCustom = (props) => {
    const openSelector = useSelector(selectModalOpenSelector)
    const dispatch = useDispatch()
    const { text, onOk } = props

    const [open, setOpen] = useState(openSelector)

    useEffect(() => {
        setOpen(openSelector)
    }, [openSelector])

    return (
        <Modal
            open={open}
            confirmLoading={false}
            onOk={onOk}
            onCancel={() => dispatch(closeModal())}
        >
            {text}
        </Modal>
    )
}

export default ModalCustom
