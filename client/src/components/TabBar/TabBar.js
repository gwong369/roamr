import React from "react";
import { Link } from "react-router-dom";
import "./TabBar.css";
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';



class TabBar extends React.Component {

    render() {
        return (
            
            <Nav bsStyle="tabs"  onSelect={this.handleSelect}>
                    <img className="Logo" alt="roamr logo" src={"https://github.com/zorporate/final-project/blob/master/client/src/ROAMR-logo.png?raw=true"}/>
                    <br></br>
                <NavItem eventKey={1} href="/profile">
                    <Link to="/profile">
                        Profile
                    </Link>
                </NavItem>
                <NavItem eventKey={2} href="/feed">
                    <Link to="/feed">
                        Feed
                    </Link>
                </NavItem>
                <NavItem eventKey={3} href="/connections">
                    <Link to="/connections">
                        Connections
                    </Link>
                </NavItem>
            </Nav>
        );
    }
}


export default TabBar;