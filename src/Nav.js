import React from 'react';
import './css/App.css';
import { Link } from 'react-router-dom';

export default function Nav(){
    return(
        <nav>
            <ul className="nav-links">
                <Link className="navStyle" to="/">
                    <li>Home</li>
                </Link>
                <Link className="navStyle" to="/create_gist">
                    <li>Create gist</li>
                </Link>
                <Link className="navStyle" to="/edit_gist">
                    <li>Edit gist</li>
                </Link>
                <Link className="navStyle" to="/show_gists">
                    <li>Show gists</li>
                </Link>
                <Link className="navStyle" to="/delete_gist">
                    <li>Delete gists</li>
                </Link>
            </ul>
        </nav>
    )
}