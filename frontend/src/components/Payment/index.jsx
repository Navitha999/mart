import { Link } from 'react-router';
import './index.css';

const Payment = () => {
    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="icon-container">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1 className="payment-heading">Payment Successful</h1>
                <p className="payment-message">
                    Thank you for ordering. <br />
                    Your payment is successfully completed.
                </p>
                <Link to="/" className="return-button">
                    Return to Homepage
                </Link>
            </div>
        </div>
    )
}

export default Payment;