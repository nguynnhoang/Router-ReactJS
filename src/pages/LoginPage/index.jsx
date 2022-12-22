import { useEffect, useState } from "react";
import { CardBody, Container, Form, Input, Spinner, Card, Row, Col, Button } from "reactstrap";
import axios from 'axios';
import { userKey } from "../../variable.js";
import { useNavigate } from 'react-router-dom';
import userApi from "../../api/user.api.js";
// Nếu người dùng đã login rồi thì đường dẫn navigate người dùng về trang home

function LoginPage({ onChangeUser }) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState({
        isLoading: false,
        data: []
    });

    const onSelectUser = (event) => {
        const id = event.target.value;
        // Khi này id sẽ là một string cho nên để dấu + đằng trước để thay đổi type của id thành number
        const user = users.data.find(item => item.id === +id)
        setUserInfo(user);
    }
    const onSubmitUser = (e) => {
        e.preventDefault();
        if (userInfo) {
            // Login thành công sẽ có access token tuy nhiên đang làm tĩnh nên k có
            onChangeUser(userInfo);
            // Lưu lại user vào localstorage
            localStorage.setItem(userKey, JSON.stringify(userInfo));
            // Chuyển về trang homepage
            navigate('/');


        } else {
            // Nếu submit k được thì đưa ra một thông báo hiển thị và yêu cầu người dùng nhập hoặc chọn 

        }


    }

    useEffect(() => {
        async function getUsers() {
            setUsers(prev => ({ ...prev, isLoading: true }));
            const respone = await userApi.getAll()
            setUsers(prev => ({
                ...prev,
                isLoading: false,
                data: [{ id: '', name: '--Please choose an option--' }, ...respone.data]
            }));
        }
        getUsers();
    }, [])



    return <Container >{users.isLoading ? <Spinner></Spinner> :
        <div>
            <Card>
                <CardBody>
                    <Form onSubmit={onSubmitUser}>
                        <Row xs='2' className="d-flex justify-content-center align-items-center">
                            <Col xs='6'>
                                <Input onChange={onSelectUser} type="select">{users.data.map(user =>
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                )} </Input>
                            </Col>
                            <Col xs='1'>
                                <Button color="primary" outline>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>

    }</Container>
};

export default LoginPage;