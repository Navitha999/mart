import { useState } from "react"
import "./index.css"

const ProductItem=({eachDetails,addingCart})=>{
    const {name,weight,price,image}=eachDetails

    const handleAdding=()=>{
        addingCart(eachDetails)
    }
    return(
        <div className="product-card">
            <div className="product-image-container">
                <img src={image} alt={name} className="product-image"/>
            </div>
            <div className="product-details">
                <p className="product-name">{name}</p>
                <p className="product-weight">{weight}</p>
                <div className="product-bottom-row">
                    <p className="product-price"> {price}</p>
                    <button className="add-btn" onClick={handleAdding}>Add</button>
                </div>
            </div>
        </div>
    )
}
export default ProductItem