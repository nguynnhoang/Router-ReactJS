import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function PostsPage({ user }) {


    const [posts, setPosts] = useState({
        isLoading: false,
        data: []
    })

    const [deleteItemId, setDeleteItemId] = useState(null);

    const toggleConfirmModal = (PostId) => {
        setDeleteItemId(PostId);
    }

    const onRemoveBtn = async () => {
        const respone = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteItemId}`);
        const newPosts = posts.data.filter((item) => item.id !== deleteItemId);
        console.log(newPosts)
        toggleConfirmModal(null);
        setPosts(prev => ({
            ...prev, data: newPosts
        }));
    }

    const renderPosts = posts.data.map(post => <CardBody key={post.id}>
        <CardText>
            ID: {post.id}
        </CardText>
        <CardTitle tag="h5">
            {post.title}
        </CardTitle>
        <CardText>
            {post.body}
        </CardText>
        <Button color="danger" onClick={(e) => { toggleConfirmModal(post.id) }}>
            Remove
        </Button>
    </CardBody>)

    useEffect(() => {
        async function getPostsByUserId() {
            setPosts(prev => ({ ...prev, isLoading: true }))
            const respone = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
            console.log(respone);
            setPosts(prev => ({ ...prev, isLoading: false, data: respone.data }))
        }
        getPostsByUserId();
    }, [])


    return < div >
        <Card>
            {renderPosts}
        </Card>
        <Modal isOpen={deleteItemId !== null ? true : false} toggle={() => toggleConfirmModal(null)}>
            <ModalHeader>Remove this post</ModalHeader>
            <ModalBody>
                Do you really want to delete this post with the id <b>{deleteItemId}</b>?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onRemoveBtn}>
                    Yes
                </Button>{' '}
                <Button color="secondary" onClick={() => { toggleConfirmModal(null) }}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    </div >
}

export default PostsPage;