import React, { Component } from "react";
import { Button } from "reactstrap";

class LookMessage extends Component {

  name = React.createRef();
  key = React.createRef();
  type = React.createRef();
  idm = React.createRef();
  handle = (e) => {
    e.preventDefault();
    const info = {
      name: this.name.current.value,
      key: this.key.current.value,
      type: this.type.current.value,
      idm: this.idm.current.value

    }
    this.props.getMessage(info);
   
  }
  render() {
    return (
      <div className="container col-sm-5">
        <h2>Get info message!</h2>
        <form onSubmit={this.handle}>
          <div className="form-group row">
            <div className="col-sm 3">
              <label >Name message: </label>
              <input
                type="text"
                className="form-control"
                id="namemG"
                placeholder="name message"
                ref={this.name}
              />
            </div>

            <div className="col-sm 1">
              <label >id message:</label>
              <input
                type="text"
                className="form-control"
                id="id_m"
                placeholder="message id"
                ref={this.idm}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Key:</label>
            <textarea
              className="form-control"
              rows="1"
              id="keyG"
              placeholder="Enter here your message key"
              ref={this.key}
            />
          </div>
          <div className="form-group">
            <label >Select type cipher:</label>
            <select className="form-control" id="type_c" ref={this.type}>
              <option>DES</option>
              <option>Criptex</option>
            </select>
          </div>
          <button type="submit" className="btn btn-warning">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default LookMessage;
