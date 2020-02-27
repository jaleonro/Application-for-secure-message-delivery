import React, { Component } from "react";
import { Button } from "reactstrap";
import '../styles/viewChannel.css'
import SearchBox from "./SearchBox";
import CreateChanel from "./CreateChanel"
import axios from 'axios';
import ListChanels from './ListChanels'
import "../styles/menu.css";

class ViewChannel extends Component {
  state = {
    chanels: []
  }
  lookChanel = (data) => {
    let url = `http://localhost:3000/chanels/search`;
    const s_info = {
      busqueda: data.busqueda
    }
    axios.post(url, { chanel: s_info }).then(res => {
      console.log(res.data)
      this.setState({chanels: res.data})
    });
   
  }
  componentDidMount(){
    this.lookChanel("");
    
  }
  render() {
    return (
      <div>
        <div className="columns is-mobile">
          <div className="column is-half is-offset-one-quarter">
            <SearchBox  lookChanel = {this.lookChanel}/>
          </div> 
        </div>
        <ListChanels  chanels = {this.state.chanels}/>
      </div>
    );
  }
}

export default ViewChannel;
