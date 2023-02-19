import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

function Create() {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSumbit = async (e) => {
        e.preventDefault()

        if(!title || !url || !description) {
            setFormError("Please enter all fields of the form.")
            return
        }

        // console.log(title, url, description)
        const {data, error} = await supabase
            .from("links")
            .insert([{title, description, url}])
            .select()

        if (error) {
            console.log(error)
            setFormError("Sorry, couldn't create the link card. Something went wrong.")
        }

        if (data) {
            // console.log(data)
            setFormError(null)
            navigate('/')
        }

    }

    return (
        <div className = "page create">
            <form onSubmit={handleSumbit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="url">URL:</label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button>Create Link Card</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default Create