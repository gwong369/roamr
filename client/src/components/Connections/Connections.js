import React from "react";
import Card from "../Card";
import API from "../../Util/Api";
import TabBar from "../TabBar";

class Connections extends React.Component {

    state = {
        connections: [],
        role: ''
    }

    getConnections = () => {
        // This function will make api call for user feed
        // Then set state of users to array from database
        API.getConnections()
            .then(res => {
                console.log(res.data);
                if (res.data.connections.length == 0) {
                  this.setState({connections: [], role: res.data.role})
                }
                else {
                this.setState({connections: res.data.connections, role: res.data.role})
                }
              }
            )
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getConnections()
    }



    render() {
        return (
            <div>
              <TabBar />
                {this.state.connections.length ? (
                    <div>
                        {this.state.connections.map(connection => {
                            return (
                                    <Card
                                        firstName= {connection.firstName}
                                        interests= {connection.interests}
                                        language= {connection.languages}
                                        zipCode= {connection.zipCode}
                                        ambassador={connection.ambassador}
                                        profileURL={connection.profileURL}
                                        email={connection.email}
                                    />
                            );
                        })}
                    </div>
                ) : (
                        <h3>No Connections, you clearly have no friends</h3>
                    )}
            </div>
        )
    }
}


export default Connections;
