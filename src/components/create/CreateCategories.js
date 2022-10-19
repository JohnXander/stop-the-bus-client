import { useLocation } from "react-router-dom"

const CreateCategories = () => {
    const location = useLocation()
    console.log(location.state)

    return (
        <div>CreateCategories</div>
    )
}

export default CreateCategories