import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { ButtonGroup, Modal, ModalBody, Spinner, Table, Button, ModalHeader, ModalFooter } from 'reactstrap';
import ConfirmModal from '../../components/ConfirmModal';

function AlbumPage() {
    // Cách 1 dùng destructering để sử dụng luôn trực tiếp albumId
    const { albumId } = useParams()

    // Cách 2 sẽ dùng 1 biến params để chạy hàm userParams sau đó console.log để xem bên trong là gì và tạo một biến để sử dụng (trường hợp này là id)
    // const params = useParams();
    // const id = params.albumId;
    // console.log(params);

    const [photos, setPhotos] = useState({
        isLoading: false,
        data: []
    })

    const [picture, setPicture] = useState('');


    const [deleteItemId, setDeleteItemId] = useState(null);

    const toggleConfirmModal = (photoId) => {
        setDeleteItemId(photoId);
    }
    const onRemoveBtn = async (photoId) => {
        const respone = await axios.delete(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
        const newPhoto = photos.data.filter((item) => item.id !== deleteItemId);
        toggleConfirmModal(null);
        setPhotos(prev => ({ ...prev, data: newPhoto }));
        console.log(newPhoto);
    }

    const onZoomPicture = (url) => {
        setPicture(url);
    }

    useEffect(() => {
        async function getPhotoByAlbumId() {
            setPhotos(prev => ({ ...prev, isLoading: true }))
            const respone = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            setPhotos(prev => ({ ...prev, isLoading: false, data: respone.data }))
        }
        getPhotoByAlbumId();
    }, [])




    const renderPhotos = photos.data.map(photo => <tr key={photo.id}>
        <th scope="row">
            {photo.id}
        </th>
        <td>
            {photo.title}
        </td>
        <td>
            <img src={photo.thumbnailUrl} alt={photo.title} onClick={() => {
                onZoomPicture(photo.url)
            }} />
        </td>
        <td>
            <ButtonGroup>
                <Button color="primary">
                    Edit
                </Button>
                <Button color="info" onClick={(e) => { toggleConfirmModal(photo.id) }} >
                    Delete
                </Button>
            </ButtonGroup>
        </td>
    </tr>)

    return <div>
        {photos.isLoading ? <Spinner></Spinner> :
            <Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Thumbnail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPhotos}
                    </tbody>
                </Table>
                <Modal isOpen={picture !== ''} size='md' toggle={() => onZoomPicture('')}>
                    <ModalBody>
                        <img src={picture} width='470px' />
                    </ModalBody>
                </Modal>
                <ConfirmModal isOpen={deleteItemId !== null} title="Delete Album Element" onSubmit={onRemoveBtn} toggle={toggleConfirmModal} color="success">
                    <div className="text-danger"> Delete Album Element that have ID: {deleteItemId}</div>
                </ConfirmModal>
            </Fragment>

        }
    </div >
}
export default AlbumPage;