import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {
        return (

            <div className="row row-header mb-5">
                <div className="d-flex align-items-center justify-content-center col-12">
                    <h1>Progetto/colloquio <strong>D'vel</strong> - Stefano Arteconi</h1>
                </div>
                <div className="row">
                    <Navbar dark expand="md">
                        <div className="container">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-home"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/single">
                                        <span className="fa fa-check"></span> Single
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/multi">
                                        <span className="fa fa-list-ul"></span> Multiple
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/playground">
                                        <span className="fa fa-wrench"></span> Playground
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto">
                                <NavItem>
                                </NavItem>
                            </Nav>
                        </div>
                    </Navbar>
                </div>
            </div>

        );
    }
}

export default Header;