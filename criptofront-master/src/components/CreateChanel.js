import React, { Component } from "react";
import PropTypes from "prop-types";
import { Columns } from "react-bulma-components";

class CreateChanel extends Component {
  name = React.createRef();
  destinatario = React.createRef();
  remitente = React.createRef();
  
  handle = (e) =>  {
    e.preventDefault();
    //get data
    const info ={
        name: this.name.current.value,
        destinatario: this.destinatario.current.value,
        remitente: this.remitente.current.value,
    }
    this.props.createChanel(info);
    
  }

  render() {
    return (
      <div className="notification">
        <form onSubmit={this.handle} >
      
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Remitente: </label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input is-primary"
                    type="email"
                    placeholder="e.g. niparrara@gmail.com"
                    ref = {this.remitente}
                    defaultValue = "correo@unal.edu.co"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Destinatario: </label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input is-info"
                    type="email"
                    placeholder="e.g. niparrara@gmail.com"
                    ref = {this.destinatario}
                    defaultValue = "correo@unal.edu.co"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Nombre del canal: </label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    className="input is-danger"
                    type="text"
                    placeholder="e.g.Cripto"
                    ref = {this.name}
                  />
                </p>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-dark">
            Send
          </button>
        </form>
      </div>
    );
  }
}

CreateChanel.propTypes = {};

export default CreateChanel;
