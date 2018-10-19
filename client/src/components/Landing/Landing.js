import React from "react";
import Row from "../Row/Row";
import Col from "../Column/Column";
import { Button } from 'react-bootstrap';
// import TabBar from "../TabBar";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "./Landing.css";


const Landing = () => (

  <div>
    <img className="Logo" alt="roamr logo" src={"https://github.com/zorporate/final-project/blob/master/client/src/ROAMR-logo.png?raw=true"} />
    
    <div className="Buttons">
    <h2>
        Connecting the world, one traveler at a time.
    </h2>
    <br></br>
      <Row>
        <Col size="md-12">
          <Button bsStyle="success">
            <NavLink to="/Login">Login</NavLink>
          </Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col size="md-12">
          <Button bsStyle='success' to="/Registration">
            <NavLink to="/Registration">Register</NavLink>
          </Button>
        </Col>
      </Row>
    </div>
  </div>
);

export default Landing;
