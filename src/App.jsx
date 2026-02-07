import React, { Component } from 'react'
import './App.css'
import { APIURL, callApi } from './lib.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showpopup: false,
      userdata: null
    };

    this.getData = this.getData.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }

  componentDidMount() {
    callApi("GET", APIURL, "", this.getData);
  }

  getData(res) {
    this.setState({ data: res });
  }

  showUserInfo(user) {
    this.setState({ showpopup: true, userdata: user });
  }

  closeUserInfo() {
    this.setState({ showpopup: false, userdata: null });
  }

  render() {
    const { data, showpopup, userdata } = this.state;

    return (
      <div className="app">

        {/* HEADER */}
        <div className="header">
          <div className="header-content">
            <img
              src={import.meta.env.BASE_URL + 'image.png'}
              alt="Profile"
              className="profile-photo"
            />
            <div className="header-title">API</div>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="section">
          <h1>Welcome to the API Data Display Page</h1>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id} onClick={() => this.showUserInfo(user)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => callApi("GET", APIURL, "", this.getData)}>
            Get Data
          </button>
        </div>

        {/* POPUP MODAL */}
        {showpopup && userdata && (
          <div className="popup-overlay" onClick={this.closeUserInfo}>
            <div className="popup-card" onClick={(e) => e.stopPropagation()}>
              <h2>User Details</h2>

              <p><strong>ID:</strong> {userdata.id}</p>
              <p><strong>Name:</strong> {userdata.name}</p>
              <p><strong>Username:</strong> {userdata.username}</p>
              <p><strong>Email:</strong> {userdata.email}</p>

              <button className="close-btn" onClick={this.closeUserInfo}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="footer">
          ©️ 2026 Ankit Raj. All rights reserved.
        </div>

      </div>
    );
  }
}
