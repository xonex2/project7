import React, { Component } from 'react'
import './App.css'
import './lib.js'
import { APIURL, callApi } from './lib.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {data:[]};
    this.getData = this.getData.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }
  componentDidMount() 
  {
    callApi("GET",APIURL,"",this.getData);
  }
  getData(res)
  {
    this.setState({data:res});
  }
  showUserInfo(user){
    this.setState({showpopup:true,userdata:user});
  }
  closeUserInfo(){
    this.setState({showpopup:null});
  }
  render() {
    const {data,showpopup,userdata}=this.state;
    const IMGURL = import.meta.env.BASE_URL;
    return (
      <div className='app'>
        <div className='header'>Example for APIs,Fetch Function</div>
        <div className='profile'>
          <img src={import.meta.env.BASE_URL + 'image.png'} alt="Profile Photo" className='profile-photo' />
        </div>
        <div className='section'>
          <h1>Welcome to the API Data Display Page</h1>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
            {
              this.state.data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            }
          </table>
          <button onClick={this.getData}>Get Data</button>
        </div>
        <div className='footer'>©️ 2026 Ankit Raj. All rights reserved.</div>
      </div>
    )
  }
}