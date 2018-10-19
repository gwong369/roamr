import React from 'react';
import Card from "../Card";
import API from "../../Util/Api";
import TabBar from "../TabBar";
class Feed extends React.Component {

    state = {
        users: []
    }

    getUsers = () => {
        // This function will make api call for user feed
        // Then set state of users to array from database
        API.getUsers(this.state.location)
            .then(res => {
                console.log(res.data);
                this.setState({ users: res.data.userArray, me: res.data.me })
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.getUsers()
    }

    makeConnection(e, uID, myId) {
      e.preventDefault();
      console.log(uID, this.state.me._id);
      API.postNewConnection({
        ambassadorId: uID
      });
    }

    render() {
        return (
            <div>
              <TabBar />
              <div className="traveler-wrapper"></div>
                {this.state.users.length ? (
                    <div>
                        {this.state.users.map(user => {
                            return (
                                    <Card
                                        firstName= {user.firstName}
                                        interests= {user.interests}
                                        language= {user.language}
                                        email={user.email}
                                        zipCode= {user.zipCode}
                                        ambassador={user.ambassador}
                                        profileURL={user.profileURL}
                                        handleBtnClick={((e) => this.makeConnection(e, user._id))}
                                    />
                            );
                        })}
                    </div>
                ) : (
                        <h3>No One In Your Area, Move!</h3>
                    )}
              </div>
        )
    }
}


export default Feed;
