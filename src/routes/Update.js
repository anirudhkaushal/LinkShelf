import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient";

function Update() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!title || !url || !description) {
            setFormError("Please enter all fields of the form.")
            return
        }

        const {data, error} = await supabase
            .from('links')
            .update({title, description, url})
            .eq('id', id)
            .select()

        if (error) {
            console.log(error)
            setFormError("Sorry, couldn't update the link card. Something went wrong.")
        }

        if (data) {
            setFormError(null)
            navigate('/')
        }

    }

    useEffect( () => {
        const fetchLink = async () => {
            const {data, error} = await supabase
                .from('links')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                navigate('/', { replace: true })
            }

            if (data) {
                setTitle(data.title)
                setUrl(data.url)
                setDescription(data.description)
            }
        }
        fetchLink()
    }, [id, navigate])

    return (
        <div className = "page update">
            <form onSubmit={handleSubmit}>
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

                <button>Update Link Card</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default Update