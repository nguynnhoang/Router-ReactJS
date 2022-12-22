import { Link } from "react-router-dom";

function Error404() {
    return <div className="d-flex flex-column align-items-center">
        <h1>404 NOT FOUND</h1>
        <Link to='/'>Back to HomePage</Link>
    </div>
}

export default Error404;