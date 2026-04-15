import { useEffect, useState, useContext } from "react"
import Cookies from "js-cookie"
import { ThreeDots } from "react-loader-spinner"
import CategoryName from "../CategoryName/index.jsx"
import ProductItem from "../ProductItem/index.jsx"
import Header from "../Header/index.jsx"
import Footer from "../Footer/index.jsx"
import { CartContext } from "../../context/CartContext.jsx";
import "./index.css"

const Home = () => {
    const [catName, setCatName] = useState([])
    const [activeCategory, setActiveCategory] = useState("All")
    const [isLoading, setIsLoading] = useState(true)
    const { addingCart } = useContext(CartContext)
    const fetchingData = async () => {
        setIsLoading(true)
        const jwtToken = Cookies.get("jwt_Token")
        const url = "https://apis2.ccbp.in/nxt-mart/category-list-details"
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        // console.log(data)
        if (response.ok) {
            setCatName(data.categories)
            setIsLoading(false)
            // No need to setEachItem natively anymore since activeCategory mapping handles it!
        }

    }
    useEffect(() => {
        fetchingData()

    }, [])
    console.log(catName)

    const renderLoader = () => (
        <div className="loader-container">
            <ThreeDots color="#0b800e" height="50" width="50" />
        </div>
    )

    return (
        <>
            <Header />
            <div className="home-container">
                {isLoading ? renderLoader() : (
                    <>
                        <div className="sidebar">
                            <h3 className="categories-heading">Categories</h3>
                            <ul className="categories-list">
                                <li className="category-item">
                                    <button
                                        className={`category-btn ${activeCategory === 'All' ? 'active' : ''}`}
                                        onClick={() => setActiveCategory('All')}
                                    >
                                        All
                                    </button>
                                </li>
                                {catName.map(eachItem => (
                                    <CategoryName
                                        key={eachItem.name}
                                        eachName={eachItem}
                                        isActive={activeCategory === eachItem.name}
                                        onClickCategory={() => setActiveCategory(eachItem.name)}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className="main-content">
                            {catName
                                .filter(category => activeCategory === 'All' || category.name === activeCategory)
                                .map(category => (
                                    <div className="category-section" key={category.name}>
                                        <h4 className="category-title">{category.name} <span className="chevron">&gt;</span></h4>
                                        <div className="category-products-container">
                                            {category.products.map(each => (
                                                <ProductItem key={each.id} eachDetails={each} addingCart={addingCart} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>

                    </>
                )}
            </div>
            <Footer />
        </>


    )
}

export default Home