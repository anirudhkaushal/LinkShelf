import { useState } from "react"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import "./Navbar.css"

import { FaLink, FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";


function Navbar() {

    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return (
        <>
        <IconContext.Provider value={{ color: "#fff" }}>
            <nav className="navbar">
                <div className="navbar-container container">
                    <Link to = "/" className="navbar-logo" onClick={closeMobileMenu}>
                        <FaLink className="navbar-icon"/>
                        LinkShelf
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink to = "/" className={( {isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to = "/create" className={( {isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                                Create
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>  
        </IconContext.Provider>   
        </>
    )
}

export default Navbar;