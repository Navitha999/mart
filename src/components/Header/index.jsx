import "./index.css"
import {Link} from "react-router"
import Cookies from "js-cookie"
import { Navigate } from "react-router"

const Header = () => {
    const handleLogout=()=>{
        const token=Cookies.get("jwt_Token")
        if(token!==undefined){
            Cookies.remove("jwt_Token")
            return <Navigate to="/login"/>
        }
        
    }
    return(
        <div className="navbar">
            <Link to="/">
                <img className="navImg" alt="logo" src="https://res.cloudinary.com/dvzmtafph/image/upload/v1775882251/6fad20838855997d164dd88d885fad87bdfa3be6_fpr0nw.png"/>
            </Link>
            <div className="nav-links">
                <Link to="/" className="nav-link active">Home</Link>
                <Link to="/cart" className="nav-link">Cart</Link>
                <Link to="/login" className="logout-btn" onClick={handleLogout}>
                    <svg className="logout-icon" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Header