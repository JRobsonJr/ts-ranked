import React from 'react';

import './Navbar.css';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/">
            <b>TS RANKER</b>
        </a>
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
                <a className="nav-link" href="/">
                    HOME <span className="sr-only">(current)</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/ranking">
                    RANKING
                </a>
            </li>
        </ul>
    </div>
);

export default Navbar;
