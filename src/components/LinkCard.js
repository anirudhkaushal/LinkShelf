import { Link } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import supabase from "../config/supabaseClient";

function LinkCard({ link, onDelete }) {

    const handleDelete = async () => {
        const {data, error} = await supabase
            .from('links')
            .delete()
            .eq('id', link.id)
            .select()

        if (error) {
            console.log(error);
        }

        if (data) {
            // console.log(data);
            onDelete(link.id);
        }

    }


    return (
        <div className="link-card">
            <h3>{link.title}</h3>
            <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
            <p>{link.description}</p>
            <div className="buttons">
                <Link to={'/' + link.id}>
                    <GrEdit className="card-icon" />
                </Link>
                <RiDeleteBinLine className="card-icon" onClick={handleDelete}/>
            </div>
        </div>
    )
}

export default LinkCard;