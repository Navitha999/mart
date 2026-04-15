import { useContext } from "react";
import { useNavigate } from "react-router";
import Header from "../Header/index.jsx";
import Footer from "../Footer/index.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import "./index.css";

const Cart = () => {
    const { cart, increment, decrement, removeItem } = useContext(CartContext);

    const navigate = useNavigate();

    // Calculate total price accurately
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            // Remove non-numeric characters (like ₹ or ,) before multiplying
            const price = typeof item.price === 'string'
                ? parseFloat(item.price.replace(/[^\d.]/g, ''))
                : item.price;
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    return (
        <>
            <Header />
            <div className="cart-page-container">
                <div className="cart-content-wrapper">
                    <h1 className="cart-heading">Your Cart</h1>

                    {cart.length === 0 ? (
                        <div className="empty-cart-container">
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-mart/empty-cart-img.png"
                                alt="empty cart"
                                className="empty-cart-image"
                            />
                            <p className="empty-text">Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items-list">
                                {cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image} alt={item.name} className="cart-item-img" />

                                        <div className="cart-item-details">
                                            <p className="cart-item-name">{item.name}</p>
                                            <p className="cart-item-price">{item.price}</p>
                                        </div>

                                        <div className="quantity-controller">
                                            <button
                                                type="button"
                                                className="qty-btn"
                                                onClick={() => decrement(item.id)}
                                            >
                                                -
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                type="button"
                                                className="qty-btn"
                                                onClick={() => increment(item.id)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <h2 className="total-label">Total: <span>₹{calculateTotal()}</span></h2>
                                <button className="checkout-button" onClick={() => navigate('/payment')}>Place Order</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;