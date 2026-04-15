const CategoryName=({eachName, isActive, onClickCategory})=>{
    const {name}=eachName
    return(
        <li className="category-item">
            <button 
                className={`category-btn ${isActive ? 'active' : ''}`}
                onClick={onClickCategory}
            >
                {name}
            </button>
        </li>
    )
}
export default CategoryName