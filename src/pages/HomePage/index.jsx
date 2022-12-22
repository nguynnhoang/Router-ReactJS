import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ButtonGroup, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import albumApi from "../../api/album.api";
import ModalEditAlbum from "./ModalEditAlbum";

export const HomeContext = createContext({
    editItem: null,
    error: null,
    closeModal: () => {},
    updateAlbum: () => {}
})

function HomePage({ user }) {

    const [albums, setAlbums] = useState([]);

    const [deleteItemId, setDeleteItemId] = useState(null);

    const [editItem, setEditItem] = useState(null)

    const [error, setError] = useState('')

    const toggleConfirmModal = (AlbumId) => {
        setDeleteItemId(AlbumId);
    }

    const onRemoveBtn = async () => {
        const respone = await axios.delete(`https://jsonplaceholder.typicode.com/albums/${deleteItemId}`);
        const newAlbums = albums.filter((item) => item.id !== deleteItemId);
        toggleConfirmModal(null);
        setAlbums(newAlbums);
    }

    const updateAlbum = async (newAlbum) => {
        const index = albums.findIndex((album) => album.id === editItem.id)
        //console.log(index)
        if (index === -1) {
            setError('Album not found')
            return
        }
        const response = await albumApi.update(editItem.id, newAlbum)
        //update lại danh sách
        albums[index] = {...albums[index], title: response.data.title}
        setAlbums([...albums])
        closeModalEdit()
    }

    const onEditItem = (item) => {
        setEditItem(item)
    }

    const closeModalEdit = () => setEditItem(null)

    const renderAlbums = albums.map((item) => <tr key={item.id}>
        <th scope="row">
            <Link to={`album/${item.id}`}> {item.id}</Link>
        </th>
        <td>
            {item.title}
        </td>
        <td>
            <ButtonGroup>
                <Button color="primary" onClick={(e) => {onEditItem(item)}}>
                    Edit
                </Button>
                <Button color="info" onClick={(e) => { toggleConfirmModal(item.id) }} >
                    Delete
                </Button>
            </ButtonGroup>
        </td>
    </tr>)

    useEffect(() => {
        const fetchPosts = async () => {
            // const respone = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
            // setAlbums(respone.data);
            const response = await albumApi.getByUser(user.id)
            setAlbums(response.data)
        }
        fetchPosts();
    }, [user]);

    const value = {
        editItem,
        error,
        closeModal: closeModalEdit,
        updateAlbum
    }
    return (
    <HomeContext.Provider value={value}>
    <div>
        <Table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
            </tr>
        </thead>
        <tbody>
            {renderAlbums}
        </tbody>
    </Table>
        <ConfirmModal 
            isOpen={deleteItemId !== null} 
            title="Delete Album" 
            onSubmit={onRemoveBtn} 
            toggle={toggleConfirmModal} 
            color="success">
                <div className="text-danger"> Delete Album have ID: {deleteItemId}</div>
        </ConfirmModal>

        <ModalEditAlbum/>
    </div>
    </HomeContext.Provider>
)};

export default HomePage;