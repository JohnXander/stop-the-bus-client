import './style.css'

const Categories = ({ categories }) => {

    return (
        <div className='categories'>
            {categories.map(category => {
                return <p key={category.id}>{category.name}</p>
            })}
        </div>
    )
}

export default Categories