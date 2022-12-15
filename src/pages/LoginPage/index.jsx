import { useEffect } from "react"
import { useState } from "react"
import { Button, Card, CardBody, Col, Container, Form, Input, Row, Spinner } from "reactstrap"
import axios from 'axios'
import { userKey } from "../../variables"
import { useNavigate } from "react-router-dom"

const LoginPage = ({onChangeUser}) => {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        isLoading: false,
        data: []
    })


    const onSelectUser = (event) => {
        const id = event.target.value
        const user = users.data.find(item => item.id === +id) //+id: change string to number
        //console.log(user)
        setUserInfo(user)
    }

    const onSubmitUser = (event) => {
        event.preventDefault()

        if (userInfo) {
            //successfully login
            //store in local storage
            //back to home page
            localStorage.setItem(userKey, JSON.stringify(userInfo))
            onChangeUser(userInfo)
            navigate('/')
        }
        
    }

    useEffect(() => {
        async function getUsers() {
            setUsers(prev => ({...prev, isLoading: true}))
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUsers(prev => ({
                ...prev, isLoading: false,
                data: [{id: '', name: "--Please choose one--"}, ...response.data]
            }))
        }
        getUsers()
    }, [])
 
    return (
       <Container>
         {
            users.isLoading
            ? <Spinner/>
            : <Card>
                <CardBody>
                    <Form onSubmit={onSubmitUser}>
                        <Row xs="2">
                            <Col xs={8}>
                                <Input type="select" onChange={onSelectUser}>
                                    {users.data.map(user => 
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        )}
                                </Input>
                            </Col>
                            <Col xs={4}>
                                <Button block color='primary'>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
         }
       </Container>
    )
}

export default LoginPage