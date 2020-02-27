import React, { Component } from "react";
import Loader from 'react-loaders'

class AddForm extends Component {
 
   name = React.createRef();
    key = React.createRef();
    type = React.createRef();
    msg = React.createRef();

  handle = (e) =>  {
    e.preventDefault();
    //get data
    const info ={
        name: this.name.current.value,
        key: this.key.current.value,
        type: this.type.current.value,
        msg: this.msg.current.value
    }
    this.props.createMessage(info);
   // e.currentTarget.reset(); 
  }
 
  render() {
    return (
      
      <div className="container col-sm-5">
        <h2>Add a secret message!</h2>
        
        <form onSubmit={this.handle}>
          <div className="form-group row">
            <div className="col-sm 4">
              <label>Name message:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter a name for your message"
                ref={this.name}
              />
            </div>
            <div>
              <label>Select type cipher:</label>
              <select className="form-control" ref={this.type} id="type_c">
                <option value = "DES">DES</option>
                <option value = "Criptex">Criptex</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              className="form-control"
              rows="1"
              id="msg"
              placeholder="Enter here your message"
              ref={this.msg}
            />
          </div>
          <div className="form-group ">
            <label>Key:</label>
            <textarea
              className="form-control"
              rows="1"
              id="key"
              placeholder="Enter message key"
              ref={this.key}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default AddForm;
