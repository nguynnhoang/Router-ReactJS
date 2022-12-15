import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Modal, ModalBody, Spinner, Table } from "reactstrap"

const PostsPage = ()=> {
    const {albumsId} = useParams()
    const [photos, setPhotos] = useState({
        isLoading: false,
        data: []
    })
    const [picture, setPicture] = useState('')

    const onZoomImg = (url) => {
        setPicture(url)
    }
 
    const renderRowPhotos = photos.data.map((item) => <tr key={item.id}>
            <td>{item.id}</td>
            <td><img src={item.thumbnailUrl} alt="" width={50} onClick={() => onZoomImg(item.url)}/></td>
            <td>{item.title}</td>
        </tr>)

    useEffect(() => {
        async function getPhotoByAlbumId() {
            setPhotos(prev => ({...prev, isLoading: true}))
            const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumsId}/photos`)
            console.log(response)
            setPhotos(prev => ({...prev, isLoading: false, data: response.data}))
        }
        getPhotoByAlbumId()
    }, [])

    return (
        <div>
        {photos.isLoading
            ? <Spinner/>
            : <Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRowPhotos}
                    </tbody>
                </Table> 
                <Modal isOpen={picture !== ''}  toggle={() => onZoomImg('')}>
                    <ModalBody>
                        <img src={picture} alt="" />
                    </ModalBody>
                </Modal>
            </Fragment>

        }        
        </div>
    )
}
export default PostsPage