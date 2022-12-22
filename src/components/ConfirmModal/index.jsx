// Tạo ra một props chứa các thuộc tính của Modal(Ctrl + chuột trái thẻ Modal để xem)

import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Spinner } from "reactstrap";


const ConfirmModal = ({
    title,
    children,
    onSubmit,
    toggle,
    isOpen,
    submitText = "Delete",
    color = "danger" }) => {

    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async () => {
        setSubmitting(true)
        //cach 1: async await
        // await onSubmit()
        // setSubmitting(false)

        //cach 2: promise
        onSubmit().then(() => {
            setSubmitting(false)
        })

    }

    return <Modal isOpen={isOpen}>
        <ModalHeader>
            {title}
        </ModalHeader>
        <ModalBody>
            {children}
        </ModalBody>
        <ModalFooter>
            <Button color={color} onClick={handleSubmit} disabled={submitting}>
                {submitText} {submitting && <Spinner size="sm"/>}
            </Button>{' '}
            <Button color="secondary" onClick={() => { toggle(null) }}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
}

export default ConfirmModal;