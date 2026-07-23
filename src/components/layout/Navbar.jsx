import { Link } from "react-router-dom";

import "../../styles/navbar.css";


function Navbar() {

    return (

        <nav className="navbar">

            <div className="navbar-brand">

                ⛓️ Multi-Node Voting System

            </div>


            <div className="navbar-links">

                <Link to="/">
                    Dashboard
                </Link>


                <Link to="/voting">
                    Voting
                </Link>


                <Link to="/blockchain">
                    Blockchain
                </Link>


                <Link to="/results">
                    Results
                </Link>

            </div>

        </nav>

    );

}


export default Navbar;