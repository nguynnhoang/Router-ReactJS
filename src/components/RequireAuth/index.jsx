import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../App";

// Cách dùng props để truyền vào.
// const RequireAuth = (props) => {
// const children = props.children
// const user = props.user 
//     return <div>
// {children}
//     </div>
// }


// Cách dùng trực tiếp destructering
const RequireAuth = ({ children }) => {
    const {userInfo} = useContext(GlobalContext)
    // Check user có hay chưa. Nếu có thì trả về children k thì chuyển sang trang login.

    // Cách 1: Check điều kiện rồi mới return.

    // if (!userInfo) {
    //     return <Navigate to='login' />
    // }
    // return <div>
    //     {children}
    // </div>

    // Cách 2: Dùng toán tử 3 ngôi để trả điều kiện ngay tại return. Cách này ngắn hơn và thường sử dụng hơn.
    return !userInfo ? <Navigate to='../login' /> : children;
}

export default RequireAuth;