import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, BrowserRouter, Redirect } from 'react-router-dom'
import { Button } from "react-bulma-components/full";
import '../styles/home.css'

class Home extends PureComponent {
    state = {
        goCipher: false,
        goCChanel: false,
        goView: false
    }
    
  handle = (e) => {
    this.setState({goCipher: true});
  }
  handleChanel= (e) => {
    this.setState({goCChanel: true});
  }
  handleView = (e) => {
    this.setState({goView: true});
  }
    render() {
        if (this.state.goCipher ) return <Redirect push to="/cipher" />;
        if (this.state.goCChanel ) return <Redirect push to="/newChanel" />;
        if (this.state.goView ) return <Redirect push to="/viewchannel" />;
        return (
            <div>
                 
                
                 <div className = " is-vertical-center ">
                </div>
                <div className = "columns ">
                <div className="column  is-2 is-offset-1 has-text-centered ">
                        <button className = "button is-warning but-color1"  onClick={this.handle} >  Cifra/descifra los mensajes </button>
                    </div>
                    
                    <div className="column is-1 is-offset-2  has-text-centered	 ">
                        <button className = "button is-success but-color1" onClick={this.handleChanel}> Crear canal </button>
                    </div>
                    <div className="column is-2 is-offset-2  has-text-centered	 ">
                        <button className = "button button is-info but-color1" onClick={this.handleView}> Entrar al canal</button>
                    </div>
                </div>
                
            </div>
            
        );
    }
}

Home.propTypes = {

};

export default Home;