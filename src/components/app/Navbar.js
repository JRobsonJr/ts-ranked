import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
            <b>TS RANKED</b>
        </Link>
        <NavbarCollapseButton />
        <NavbarLinkList />
    </nav>
);

const NavbarCollapseButton = () => (
    <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span className="navbar-toggler-icon" />
    </button>
);

const NavbarLinkList = () => (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    HOME <span className="sr-only">(current)</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/ranking">
                    RANKING
                </Link>
            </li>
        </ul>
    </div>
);

export default Navbar;
