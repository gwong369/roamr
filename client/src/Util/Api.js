import axios from "axios";

export default {
  // Makes a call to the server to pull in the users form the DB
  getUsers: function(data) {
    return axios.get("/api/feed", data);
  },
  
  getConnections: function(data) {
    return axios.get("/api/connections", data)
  },

  getUserInfo: function(data) {
    return axios.get("/api/profile", data)
  },

  postNewUser: function(data) {
    return axios.post("/api/register", data)
  },

  postLogin: function(data) {
    return axios.post("/api/login", data)
  },

  postNewConnection: function(data) {
    return axios.post("/api/newconnection", data)
  },

  updateLocation: function(data) {
    return axios.patch("/api/locationupdate", data)
  },

  updateStatus: function(data) {
    return axios.patch("/api/statusupdate", data)
  }
};