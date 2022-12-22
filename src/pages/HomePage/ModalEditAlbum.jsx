import { useContext, useEffect, useState } from "react"
import { Form, Input, Label, Alert } from "reactstrap"
import { HomeContext } from "."
import ConfirmModal from "../../components/ConfirmModal"


const ModalEditAlbum = () => {

    const {
        editItem,
        error,
        updateAlbum,
        closeModal
    } = useContext(HomeContext)

    const [formValue, setFormValue] = useState({
        title: ''
    })

    const onChangeForm = (e) => {
        const {name, value} = e.target
        setFormValue(prev => ({...prev, [name]: value}))
    }

    useEffect(() => {
        if (editItem !== null) {
            setFormValue({
                title: editItem.title
            })
        }
    }, [editItem])

    return (
        <ConfirmModal
            isOpen={editItem !== null ? true : false}
            toggle={closeModal}
            title={`Update item id`}
            color="primary"
            submitText="Update"
            onSubmit={async () => await updateAlbum(formValue)}
        >
            
            <Form>
                <Label for="title">Title</Label>
                <Input type="text" name="title" value={formValue.title} onChange={(e) => onChangeForm(e)}></Input>
            </Form>
        </ConfirmModal>
    )
}

export default ModalEditAlbum