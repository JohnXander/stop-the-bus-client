import './style.css'

const Categories = ({ categories }) => {

    return (
        <div className='categories'>
            {categories.map(category => {
                const formattedCategoryName = category.name[0].toUpperCase() + category.name.substring(1)

                return <h3 key={category.id}>{formattedCategoryName}</h3>
            })}
        </div>
    )
}

export default Categories