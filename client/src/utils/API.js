import axios from "axios";

const API = {
  getUser: function() {
    return axios.get("/user/");
  },

  saveUser: function(userData) {
    return axios.post("/user/", userData);
  },
  checkUser: function(userData) {
    return axios.post("/user/login", userData);
  },
};

export default API;
