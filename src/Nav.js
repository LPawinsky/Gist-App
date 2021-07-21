import React from 'react';
import './css/App.css';
import { Link } from 'react-router-dom';

export default function Nav(){
    return(
        <nav>
            <ul className="nav-links">
                <Link className="navStyle home" to="/">
                    <li>Home</li>
                    <u></u>
                </Link>
                <Link className="navStyle" to="/create_gist">
                    <li>Create gist</li>
                </Link>
            </ul>
        </nav>
    )
}