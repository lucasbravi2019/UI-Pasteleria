import { useState } from "react"


const useModalHook = () => {
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const startLoading = () => {
        setConfirmLoading(true)
    }

    const stopLoading = () => {
        setConfirmLoading(false)
    }

    return { open, confirmLoading, openModal, closeModal, startLoading, stopLoading } 
}
export default  useModalHook
