import './style.css'

const Categories = ({ categories }) => {

    return (
        <div className='categories'>
            {categories.map(category => {
                return <h3 key={category.id}>{category.name}</h3>
            })}
        </div>
    )
}

export default Categories