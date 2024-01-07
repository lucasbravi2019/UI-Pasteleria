import { Modal } from 'antd/lib'
import { useSelector } from 'react-redux'
import { selectModalOpenSelector } from '../../pages/recipes/selectors'
import { useEffect, useState } from 'react'
import { Button } from 'antd'

const ModalCustom = ({ onOk, onCancel, withButtons, children }) => {
    const openSelector = useSelector(selectModalOpenSelector)

    const [open, setOpen] = useState(openSelector)

    useEffect(() => {
        setOpen(openSelector)
    }, [openSelector])

    return (
        <Modal
            open={open}
            confirmLoading={false}
            onOk={onOk}
            onCancel={onCancel}
            cancelText="Cancelar"
            okText="Aceptar"
            footer={
                withButtons
                    ? [
                          <Button key="cancel" onClick={onCancel}>
                              Cancelar
                          </Button>,
                          <Button key="ok" type="primary" onClick={onOk}>
                              Aceptar
                          </Button>,
                      ]
                    : null
            }
        >
            {children}
        </Modal>
    )
}

export default ModalCustom
