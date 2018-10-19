import React from "react";
import "./Profile.css";

import { Grid, Row, Col, Image } from "react-bootstrap";

import API from "../../Util/Api";
import TabBar from "../TabBar";

class Profile extends React.Component {

    constructor() {
        super()
        this.state = {
            users: [],
            editing: false,
            value: ""
        }
    }
    
    getProfile = () => {
        API.getUserInfo()
            .then(res =>
                this.setState({ users: res.data, firstName: "", lastName: "", zipCode: "", interests: "", email: "" })
            )
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getProfile()
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }

    locationChange = () => {
        var newLocation = {
            newLocation: this.state.value
        }
        console.log(newLocation);
        this.state.users.forEach(user => {
            API.updateLocation(newLocation)
                .then(res => 
                    this.getProfile()
                    )
                    window.location.href = '/profile';
        });
    }

    handleEdit = () => {
        this.setState(
            {
                editing: !this.state.editing
            }
        )
    };

    handleSaveLocation = () => {
        console.log(this.state.value)
        this.handleEdit()
        this.locationChange()
    }

    renderLocationField = () => {
        console.log("Choosing render state")
        if (this.state.editing) {
            console.log("Rendering editable")
            return(
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control"
                    id="input-zip-code"
                    ref="userInput"
                    value={this.state.value}
                    onChange={this.handleChange}
                    />
                    <button onClick={this.handleSaveLocation}>Update</button>
                </div>
            )
        } else {
            console.log("Rendering static")
                return (
                this.state.users.map(user => {
                    return (
                <div>
                    <b>Zip Code:</b> {user.zipCode} <button onClick={this.handleEdit}>Update Location</button>
                </div>
                    )
                }))
        }
    };

    handleStatusUpdate = () => {
        console.log(this.state.users)
        this.state.users.forEach(user => {
            if (user.ambassador) {
                console.log("Switching to Trvlr")
                var changeFalse = {
                    status: false
                }
                API.updateStatus(changeFalse)
                    .then(res =>
                        this.getProfile()
                        )
                        window.location.href = '/profile';
            } else {
                console.log("Switching to Ambsdr")
                var changeTrue = {
                    status: true
                }
                API.updateStatus(changeTrue)
                    .then(res =>
                        this.getProfile()
                        )
                        window.location.href = '/profile';
            }
        });
    }

    render() {
        return (
            <div>
              <TabBar />
                {this.state.users.map(user => {
                    return (
                        <Grid>
                            <Row>
                                <Col md={12} className='profileCard'>
                                    <Image src={user.profileURL} thumbnail></Image>
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <br></br>
                                    <p>{this.renderLocationField()}</p> 
                                    <p><b>Interests:</b> {user.interests}</p>
                                    <p><b>Email:</b> {user.email}</p>
                                    <p><b>
                                   {user.ambassador ? "Ambassador " : "Traveler "}</b>
                                   <button onClick={this.handleStatusUpdate}>Update Status</button>
                                   </p>
                                </Col>
                            </Row>
                        </Grid>
                    )
                })}
            </div>
        )
    }
};

export default Profile;