import { FaFacebook, FaPinterest, FaTwitter, FaInstagram } from 'react-icons/fa';
import "./index.css"

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p className="contact-text">
                    For any queries, contact +91-9876543210 <br />
                    or mail us help@nxtmart.co.in
                </p>
                
                <div className="social-icons-container">
                    <FaFacebook className="social-icon" />
                    <FaPinterest className="social-icon" />
                    <FaTwitter className="social-icon" />
                    <FaInstagram className="social-icon" />
                </div>

                <p className="copyright-text">
                    Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd
                </p>
            </div>
        </footer>
    )
}

export default Footer