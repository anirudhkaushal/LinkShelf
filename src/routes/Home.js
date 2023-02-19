import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import LinkCard from "../components/LinkCard";

function Home() {

    const [fetchError, setFetchError] = useState(null)
    const [links, setLinks] = useState(null)

    const handleDelete = (id) => {
        setLinks(prevLinks => {
            return prevLinks.filter(l => l.id !== id)
        })
    }

    useEffect(() => {
        const fetchLinks = async () => {
            const {data, error} = await supabase
                .from('links')
                .select()
                .order('created_at', {ascending: false})

                if(error) {
                    setFetchError("Could not fetch the links.")
                    setLinks(null)
                    console.log(error)
                }

                if(data) {
                    setLinks(data)
                    setFetchError(null)
                }
        }
        fetchLinks()
    })

    
    return (
        <div className = "page home">
            {fetchError && (<p>{fetchError}</p>)}
            {links && (
                <div className="links">
                    <div className="link-grid">
                        {links.map(link => (
                            <LinkCard key = {link.id} link = {link} onDelete = {handleDelete}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home