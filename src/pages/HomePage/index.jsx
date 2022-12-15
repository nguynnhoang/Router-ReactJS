import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Table } from "reactstrap"

const HomePage = ({ user }) => {
    const [albums, setAlbums] = useState([])
    const renderRowAlbums = albums.map((item) => <tr key={item.id}>
        <td><Link to={`albums/${item.id}`}>{item.id}</Link></td>
        <td>{item.title}</td>
    </tr>)
    useEffect(() => {
        if(user){
            console.log(user);
            const fetchAlbums = async () => {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
                setAlbums(response.data)
            }
            fetchAlbums()
        }
    }, [user])

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRowAlbums}
                </tbody>
            </Table>
        </div>
    )
}

export default HomePage