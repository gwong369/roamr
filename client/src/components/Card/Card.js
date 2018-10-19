import React from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";
import './Card.css';

// import CardBtn from "../CardBtn";
// import request from "request";

const Card = props => (
  <div
    className="card"
    onClick={props.handleBtnClick}
    
    style={{
      backgroundColor: 'transparent'
    }}
  >
  {/* <div>
    <h2>{props.firstName}</h2>
    <p>{props.interests}</p>
    <p>{props.languages}</p>
    <p>{props.ambassador ? 'Ambassador' : 'Traveler'}</p>
  </div> */}
  <Grid>
        <Row className='profileCard'>
            <Col md={3} >
            <Image src={props.profileURL} thumbnail></Image>

            </Col>
            <Col md={9} className='profileText'>
                <h3>{props.firstName} {props.lastName}</h3>
                <br></br>
                <p><b>Zip Code:</b> {props.zipCode} </p> 
                <p><b>Interests:</b> {props.interests}</p>
                <p><b>Email:</b> {props.email}</p>
                <p><b>
                {props.ambassador ? "Ambassador " : "Traveler "}</b>
                {/* <button onClick={props.handleStatusUpdate}>Update Status</button> */}
                </p>
 
            </Col>
        </Row>
    </Grid>
    {/* <CardBtn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="pass"
    />
    <CardBtn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="pick"
    /> */}
  </div>
);

export default Card;
